import { Users } from "$lib/auth/lucia";
import { getUser } from "$lib/auth/server";
import { EMAIL_COPIES } from "$lib/const/emailCopy";
import { PendingPatches } from "$lib/models/PendingPatches";
import { Studios } from "$lib/models/Studio";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { sendEmail } from "$lib/utils/email";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const [admin, input] = await Promise.all([
    getUser(locals, { admin: true }),
    Parsers.request(
      request,
      z.union([
        z.object({
          status: z.literal("approved"),
          reason: z.string().optional(),
        }),
        z.object({
          status: z.literal("rejected"),
          reason: z.string().min(1, "Reason must be at least 1 character long"),
        }),
      ]),
    ),
  ]);

  // Find the pending patch
  const pendingPatch = await PendingPatches.findOneAndUpdate(
    { _id: params.pendingPatch_id },
    { status: input.status },
    { new: true },
  );
  if (!pendingPatch) {
    throw error(404, "Pending patch not found");
  }

  switch (pendingPatch.resource_kind) {
    case "studio": {
      // Apply the patch
      const [studioOwner, studio] = await Promise.all([
        Users.findOne(
          { _id: pendingPatch.user_id },
          { email: 1 },
        ),
        Studios.findOneAndUpdate(
          { _id: pendingPatch.resource_id },
          { $set: pendingPatch.patch },
          { new: true },
        ),
      ]);

      const emailData =
        EMAIL_COPIES.pendingPatch[pendingPatch.resource_kind][input.status];

      // Send email to studio owner
      if (studioOwner && studio) {
        await sendEmail({
          to: studioOwner.email,
          subject: emailData.subject,
          attachment: [{
            alternative: true,
            data: emailData.body({
              studio_name: studio.name,
              studio_slug: studio.slug,
              reason: input.reason,
            }),
          }],
        });
      }

      return json(suc(studio));
    }

    default:
      throw error(500, "Unknown resource kind");
  }
};
