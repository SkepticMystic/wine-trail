import { auth } from "$lib/auth/lucia";
import { OTPUtils, type TeacherInviteOTP } from "$lib/models/OTPs";
import { Teachers } from "$lib/models/Teachers";
import { Parsers } from "$lib/schema/parsers";
import { error, redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { RequestHandler } from "./$types";

const invalidTokenError = error(
  400,
  "Invalid token. Please request a new invite link.",
);

/** Take in a token, and validate
 * If valid, check if the user with that email exists
 * If they do, update their teachers
 * If they don't, create a new user which owns the teacher
 */
export const GET: RequestHandler = async ({ url, locals }) => {
  const { teacher_id, token } = Parsers.params(
    url,
    z.object({
      token: z.string().min(1),
      teacher_id: z.string().min(1),
    }),
  );

  const session = await locals.auth.validate();

  // Check if they've already accepted this invite
  if (session?.user?.teacher_ids?.includes(teacher_id)) {
    console.log("User already a member of this teacher");
    const teacher = await Teachers.findById(teacher_id, { slug: 1 }).lean();

    if (!teacher) {
      throw error(500, "Teacher not found");
    } else {
      // They are already a member of this org
      throw redirect(302, `/teachers/${teacher.slug}`);
    }
  }

  const checkToken = await OTPUtils.validateToken<TeacherInviteOTP>({
    token,
    kind: "teacher-invite",
  });
  if (!checkToken.ok) {
    console.log("validateToken failed", token);
    throw invalidTokenError;
  }
  const otp = checkToken.data;

  const checkUser = await OTPUtils.getTokenUser(otp);
  if (!checkUser.ok) {
    if (checkUser.error.message === "user_not_found") {
      console.log("Valid token, no existing user");
      // Create a new user
      throw redirect(
        302,
        `/signup?email_hint=${
          encodeURIComponent(
            checkUser.error.id.value,
          )
        }&teacher_token=${encodeURIComponent(token)}`,
      );
    } else {
      console.log("getTokenUser failed", checkUser.error);
      await otp.deleteOne();
      throw invalidTokenError;
    }
  }

  // At this point, we know:
  // - The token is valid
  // - The user exists
  // - The user does not own this teacher
  const { user } = checkUser.data;

  await Promise.all([
    auth.updateUserAttributes(user.userId, {
      // If they are an existing user, but haven't verified their email, it is verified now
      emailVerified: true,

      teacher_ids: user.teacher_ids
        ? [...user.teacher_ids, teacher_id]
        : [teacher_id],
    }),
    otp.deleteOne(),
  ]);

  throw redirect(
    302,
    `/signin?email_hint=${
      encodeURIComponent(user.email)
    }&previous=teacher-invite`,
  );
};
