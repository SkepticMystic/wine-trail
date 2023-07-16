import { Users } from "$lib/auth/lucia";
import { getUser } from "$lib/auth/server";
import { Images } from "$lib/models/Images";
import { PendingPatches } from "$lib/models/PendingPatches";

import { modifyTeacherSchema, Teachers } from "$lib/models/Teachers";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { deleteImageOnHost } from "$lib/utils/images";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
  const { teacher_id } = params;

  const [user, input] = await Promise.all([
    getUser(locals, { teacher_id }), // 🔒
    Parsers.request(request, modifyTeacherSchema),
  ]);

  if (user.admin) {
    const teacher = await Teachers.findOneAndUpdate(
      { _id: teacher_id },
      { $set: input },
      { new: true }, // Don't upsert here, POST a new teacher instead
    );

    return json(suc({ teacher }));
  } else {
    // Each resource can have one _pending_ patch
    // - If there is already a _pending_ patch, update it
    // - If there is already an _approved_ or _rejected_ patch, create a new pending patch
    await PendingPatches.updateOne(
      {
        resource_id: teacher_id,
        resource_kind: "teacher",
        status: "pending",
      },
      {
        $set: {
          patch: {
            ...input,
            _id: teacher_id,
          },
          user_id: user.userId,
        },
      },
      { upsert: true },
    );

    return json(suc());
  }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { teacher_id } = params;
  await getUser(locals, { teacher_id }); // 🔒

  const [teacher, users, images] = await Promise.all([
    Teachers.deleteOne({ _id: teacher_id }),
    Users.updateMany(
      { teacher_ids: teacher_id },
      { $pull: { teacher_ids: teacher_id } },
    ),
    Images.find(
      {
        resource_id: teacher_id,
        resource_kind: "teacher",
      },
      { _id: 1, host: 1, data: 1 },
    ).lean(),
    PendingPatches.deleteMany({
      resource_id: teacher_id,
      resource_kind: "teacher",
    }),
  ]);

  // Delete images from host and database
  await Promise.all([
    ...images.map((image) => deleteImageOnHost(image)),
    Images.deleteMany({
      _id: { $in: images.map((i) => i._id) },
    }),
  ]);

  return json(suc({ teacher }));
};
