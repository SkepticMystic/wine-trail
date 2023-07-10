import { getUser } from "$lib/auth/server";
import { PendingPatches } from "$lib/models/PendingPatches";
import { modifyStudioSchema, Studios } from "$lib/models/Studio";
import { Parsers } from "$lib/schema/parsers";
import { err, suc } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
  const [user, input] = await Promise.all([
    getUser(locals),
    Parsers.request(request, modifyStudioSchema),
  ]);

  const { studio_id } = params;

  // TODO: Admins can patch any studio
  // Studio owners can patch their own, but have to be verified (Model PendingPatches for studios, teachers, etc.)
  if (!user.admin && !user.studio_ids?.includes(studio_id)) {
    return json(err("You do not own this studio"));
  }

  if (user.admin) {
    const studio = await Studios.findOneAndUpdate(
      { _id: studio_id },
      { $set: input },
      { new: true }, // Don't upsert here, POST a new studio instead
    );

    return json(suc({ studio }));
  } else {
    // Each owner can have one pending patch per resource
    // If there is already a pending patch, update it
    // If there is already an approved or rejected patch, overwrite it
    await PendingPatches.updateOne(
      {
        user_id: user.userId,
        resource_id: studio_id,
        resource_kind: "studio",
      },
      {
        status: "pending",
        patch: input,
      },
      { upsert: true },
    );

    return json(suc({}));
  }
};
