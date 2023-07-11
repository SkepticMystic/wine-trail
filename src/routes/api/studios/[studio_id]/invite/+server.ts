import { getUser } from "$lib/auth/server";
import { OTP } from "$lib/models/OTPs";
import { Studios } from "$lib/models/Studio";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import { z } from "zod";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (
  { locals, request, url, params },
) => {
  const [user, invite] = await Promise.all([
    getUser(locals, { admin: true }),
    Parsers.request(
      request,
      z.object({
        email: z.string().email(),
      }),
    ),
  ]);

  const studio = await Studios.findOne({ _id: params.studio_id }).lean();
  if (!studio) {
    throw error(404, "Studio not found");
  }

  await OTP.handleLinks["studio-owner-invite"]({
    url,
    idValue: invite.email,
    data: { studio_id: params.studio_id },
  });

  return json(suc());
};
