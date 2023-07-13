import { Users } from "$lib/auth/lucia";
import { canModifyStudio } from "$lib/auth/permissions";
import { getUser } from "$lib/auth/server";
import { Images } from "$lib/models/Images";
import { PendingPatches } from "$lib/models/PendingPatches";
import { modifyStudioSchema, Studios } from "$lib/models/Studio";
import { Parsers } from "$lib/schema/parsers";
import { err, suc } from "$lib/utils";
import { deleteImageOnHost } from "$lib/utils/images";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
  const [user, input] = await Promise.all([
    getUser(locals),
    Parsers.request(request, modifyStudioSchema),
  ]);

  const { studio_id } = params;

  // Admins can patch any studio
  // Studio owners can patch their own, but have to be verified (Model PendingPatches for studios, teachers, etc.)
  if (!canModifyStudio(user, studio_id)) {
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

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const user = await getUser(locals);

  const { studio_id } = params;

  if (!canModifyStudio(user, studio_id)) {
    return json(err("You do not own this studio"));
  }

  const [studio, users, images] = await Promise.all([
    Studios.deleteOne({ _id: studio_id }),
    Users.updateMany(
      { studio_ids: studio_id },
      { $pull: { studio_ids: studio_id } },
    ),
    Images.find(
      {
        resource_id: studio_id,
        resource_kind: "studio",
      },
      { _id: 1, host: 1, data: 1 },
    ).lean(),
    PendingPatches.deleteMany({
      resource_id: studio_id,
      resource_kind: "studio",
    }),
  ]);

  // Delete images from host and database
  await Promise.all([
    ...images.map((image) => deleteImageOnHost(image)),
    Images.deleteMany({
      _id: { $in: images.map((i) => i._id) },
    }),
  ]);

  return json(suc({ studio }));
};
