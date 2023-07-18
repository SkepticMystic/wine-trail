import { auth } from "$lib/auth/lucia";
import { OTPUtils, type StudioOwnerInviteOTP } from "$lib/models/OTPs";
import { Studios } from "$lib/models/Studio";
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
 * If they do, update their studios
 * If they don't, create a new user which owns the studio
 */
export const GET: RequestHandler = async ({ url, locals }) => {
  const { studio_id, token } = Parsers.params(
    url,
    z.object({
      token: z.string().min(1),
      studio_id: z.string().min(1),
    }),
  );

  if (studio_id) {
    const session = await locals.auth.validate();
    // Check if they've already accepted this invite
    if (session?.user?.studio_ids?.includes(studio_id)) {
      console.log("User already a member of this studio");
      const studio = await Studios.findById(studio_id, { slug: 1 }).lean();
      if (!studio) {
        throw error(500, "Studio not found");
      } else {
        // They are already a member of this org
        throw redirect(302, `/studios/${studio.slug}`);
      }
    }
  }

  const checkToken = await OTPUtils.validateToken<StudioOwnerInviteOTP>({
    token,
    kind: "studio-owner-invite",

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
        }&studio_owner_token=${encodeURIComponent(token)}`,
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
  // - The user does not own this studio
  const { user } = checkUser.data;

  await Promise.all([
    auth.updateUserAttributes(user.userId, {
      // If they are an existing user, but haven't verified their email, it is verified now
      emailVerified: true,

      studio_ids: user.studio_ids
        ? [...user.studio_ids, studio_id]
        : [studio_id],
    }),
    otp.deleteOne(),
  ]);

  throw redirect(
    302,
    `/signin?email_hint=${
      encodeURIComponent(user.email)
    }&previous=studio-owner-invite`,
  );
};
