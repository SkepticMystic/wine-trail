import { getUser } from "$lib/auth/server";
import { Images } from "$lib/models/Images";
import { suc } from "$lib/utils";
import { deleteImageOnHost } from "$lib/utils/images";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const user = await getUser(locals);

  const { image_id } = params;

  const promises: Promise<any>[] = [];

  const image = await Images.findOne(
    { _id: image_id },
    {
      host: 1,
      resource_id: 1,
      resource_kind: 1,
      "data.filePath": 1,
    },
  ).lean();
  if (!image) throw error(404, "Image not found.");

  if (user.admin) {
    // Admins can delete any image
    promises.push(Images.deleteOne({ _id: image_id }).lean());
  } else {
    // Non-admins can only delete images they own 🔒
    switch (image.resource_kind) {
      case "studio": {
        if (!user.studio_ids?.includes(image.resource_id)) {
          throw error(403, "You do not have permission to delete this image.");
        } else break;
      }

      default: {
        throw error(500, "Unknown resource kind.");
      }
    }

    // Here we know that the user has permission to delete the image
    promises.push(Images.deleteOne({ _id: image_id }).lean());
  }

  promises.push(deleteImageOnHost(image));

  await Promise.all(promises);

  return json(suc());
};
