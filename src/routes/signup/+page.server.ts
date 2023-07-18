import { auth } from "$lib/auth/lucia";
import {
  OTPUtils,
  OTPs,
  type StudioOwnerInviteOTP,
  type TeacherInviteOTP,
} from "$lib/models/OTPs";
import { passwordSchema } from "$lib/schema/index";
import { Parsers } from "$lib/schema/parsers";
import { INTERNAL_SERVER_ERROR } from "$lib/utils/errors";
import { type Actions, error, redirect } from "@sveltejs/kit";
import type { User } from "lucia";
import { z } from "zod";

const handleInviteToken = async (
  email: string,
  tokens: {
    teacher_token?: string;
    studio_owner_token?: string;
  },
) => {
  let attributes: Pick<User, "emailVerified" | "studio_ids" | "teacher_ids">;

  if (tokens.studio_owner_token) {
    // Find and delete the OTP
    const otp = await OTPs.findOneAndDelete({
      token: tokens.studio_owner_token,
      kind: "studio-owner-invite",
      identifier: `email:${email}`,
    }).lean() as StudioOwnerInviteOTP | null;

    if (!otp) throw error(400, "Invalid studio invite token");

    attributes = {
      emailVerified: true,
      studio_ids: [otp.data.studio_id],
      teacher_ids: [],
    };
  } else if (tokens.teacher_token) {
    // Find and delete the OTP
    const otp = await OTPs.findOneAndDelete({
      token: tokens.teacher_token,
      kind: "teacher-invite",
      identifier: `email:${email}`,
    }).lean() as TeacherInviteOTP | null;

    if (!otp) throw error(400, "Invalid teacher invite token");

    attributes = {
      emailVerified: true,
      studio_ids: [],
      teacher_ids: [otp.data.teacher_id],
    };
  } else {
    // If someone is just randomly signing up, they don't own a studio yet
    attributes = {
      emailVerified: false,
      studio_ids: [],
      teacher_ids: [],
    };
  }

  return attributes;
};

export const actions: Actions = {
  default: async ({ request, locals, url }) => {
    const { email, password } = await Parsers.form(
      request,
      z.object({
        email: z.string().email(),
        password: passwordSchema,
      }),
    );

    const parsedParams = Parsers.params(
      url,
      z.object({
        teacher_token: z.string().optional(),
        studio_owner_token: z.string().optional(),
      }),
    );

    const attributes = await handleInviteToken(email, parsedParams);

    try {
      const { userId } = await auth.createUser({
        attributes: {
          email,
          ...attributes,
        },
        key: {
          password,
          providerId: "email",
          providerUserId: email,
        },
      });

      const [session] = await Promise.all([
        auth.createSession(userId),
        !attributes.emailVerified
          ? OTPUtils.handleLinks["email-verification"]({
            url,
            email,
            idValue: userId,
          })
          : undefined,
      ]);

      locals.auth.setSession(session);
    } catch (e) {
      const { message } = e as Error;
      if (
        message === "AUTH_DUPLICATE_KEY_ID" ||
        message === "AUTH_DUPLICATE_USER_DATA"
      ) {
        throw error(400, "Email already in use");
      }

      throw INTERNAL_SERVER_ERROR(e);
    }

    throw redirect(302, "/");
  },
};
