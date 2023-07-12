import { getUser } from "$lib/auth/server";
import { Images } from "$lib/models/Images";
import { suc } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const user = await getUser(locals);

  const { image_id } = params;

  if (user.admin) {
    await Images.deleteOne({ _id: image_id }).lean();

    return json(suc());
  }

  const image = await Images.findOne(
    {
      _id: image_id,
      resource_id: { $in: user.studio_ids }, // Authorize
    },
    { resource_id: 1, resource_kind: 1 },
  ).lean();

  if (!image) throw error(404, "Image not found.");

  switch (image.resource_kind) {
    case "studio": {
      if (!user.studio_ids?.includes(image.resource_id)) {
        throw error(403, "You do not have permission to delete this image.");
      }

      break;
    }

    default: {
      throw error(500, "Unknown resource kind.");
    }
  }

  // TODO: Delete on corresponding host, as well
  await Images.deleteOne({ _id: image_id }).lean();

  // We know the image exists, at this point
  return json(suc());
};
