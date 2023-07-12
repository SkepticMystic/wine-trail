import { UploadJS } from "$lib/APIs/uploadJS";
import { canModifyStudio } from "$lib/auth/permissions";
import { getUser } from "$lib/auth/server";
import {
  IMAGE_HOSTS,
  IMAGE_KIND_MAX_COUNTS,
  IMAGE_KINDS,
} from "$lib/const/images";
import { RESOURCE_KINDS } from "$lib/const/pendingPatches";
import { Images } from "$lib/models/Images";
import { Parsers } from "$lib/schema/parsers";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [
    user,
    {
      host,
      image_data,
      image_type,
      image_kind,
      resource_id,
      resource_kind,
    },
  ] = await Promise.all([
    getUser(locals),
    Parsers.request(
      request,
      z.object({
        host: z.enum(IMAGE_HOSTS),

        image_data: z.string().min(1, "Image data is required"),
        image_type: z.string().min(1, "Image type is required"),
        image_kind: z.enum(IMAGE_KINDS),

        resource_kind: z.enum(RESOURCE_KINDS),
        resource_id: z
          .string()
          .min(1, "Resource ID is required"),
      }),
    ),
  ]);

  switch (resource_kind) {
    case "studio": {
      if (!canModifyStudio(user, resource_id)) {
        throw error(403, "You don't have access to this studio");
      } else break;
    }

    default: {
      throw error(400, "Invalid resource kind");
    }
  }

  const existingImages = await Images.countDocuments({
    resource_id,
    resource_kind,
    image_kind,
  });

  if (IMAGE_KIND_MAX_COUNTS[image_kind] <= existingImages) {
    throw error(
      400,
      `You can only upload ${
        IMAGE_KIND_MAX_COUNTS[image_kind]
      } ${image_kind} image(s) for this ${resource_kind}.`,
    );
  }

  console.log({ image_type, resource_kind, resource_id, existingImages });

  switch (host) {
    case "uploadjs": {
      const data = await UploadJS.managedUpload({
        image_data,
        image_type,
        path: {
          folderPath: `/images/${resource_kind}/${resource_id}/${image_kind}`,
          fileName: `${existingImages}.${image_type.split("/")[1]}`,
        },
      });

      if (data.ok) {
        await Images.create({
          resource_id,
          resource_kind,
          image_kind,

          host,
          data: data.data,
        });
      }

      return json(data);
    }

    default: {
      throw error(400, "Invalid image host");
    }
  }
};
