import { Users } from "$lib/auth/lucia";
import { getUser } from "$lib/auth/server";
import { Images } from "$lib/models/Images";
import { PendingPatches } from "$lib/models/PendingPatches";
import { modifyStudioSchema, Studios } from "$lib/models/Studio";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { deleteImageOnHost } from "$lib/utils/images";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
  const { studio_id } = params;
  const [user, input] = await Promise.all([
    getUser(locals, { studio_id }), // 🔒
    Parsers.request(request, modifyStudioSchema),
  ]);

  if (user.admin) {
    const studio = await Studios.findOneAndUpdate(
      { _id: studio_id },
      { $set: input },
      { new: true }, // Don't upsert here, POST a new studio instead
    );

    return json(suc({ studio }));
  } else {
    // Each resource can have one _pending_ patch
    // - If there is already a _pending_ patch, update it
    // - If there is already an _approved_ or _rejected_ patch, create a new pending patch
    await PendingPatches.updateOne(
      {
        resource_id: studio_id,
        resource_kind: "studio",
        status: "pending",
      },
      {
        $set: {
          patch: {
            ...input,
            _id: studio_id,
          },
          user_id: user.userId,
        },
      },
      { upsert: true },
    );

    return json(suc({}));
  }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { studio_id } = params;
  await getUser(locals, { studio_id }); // 🔒

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
