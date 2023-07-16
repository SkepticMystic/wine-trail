import { getUser } from "$lib/auth/server";
import { OTP, OTPs } from "$lib/models/OTPs";
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

  const [studio, existingInvite] = await Promise.all([
    Studios.findOne(
      { _id: params.studio_id },
      { name: 1 },
    ).lean(),
    OTPs.exists({
      kind: "studio-owner-invite",
      "data.studio_id": params.studio_id,
      "identifier": `email:${invite.email}`,
    }).lean(),
  ]);
  if (!studio) {
    throw error(404, "Studio not found");
  }
  if (existingInvite) {
    throw error(
      400,
      "Invite already sent. Studio owner has not yet signed up.",
    );
  }

  await OTP.handleLinks["studio-owner-invite"]({
    url,
    idValue: invite.email,
    studio_name: studio.name,
    data: { studio_id: params.studio_id },
  });

  return json(suc());
};
