import { UploadJS } from "$lib/APIs/uploadJS";
import { canModifyResource } from "$lib/auth/permissions";
import { getUser } from "$lib/auth/server";
import {
  IMAGE_HOSTS,
  IMAGE_KIND_MAX_COUNTS,
  IMAGE_KINDS,
} from "$lib/const/images";
import { RESOURCE_KINDS } from "$lib/const/resources";
import type { Err, Suc } from "$lib/interfaces";
import { Images } from "$lib/models/Images";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import type { FileDetails, FilePathDefinition } from "upload-js-full";
import { z } from "zod";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [
    user,
    {
      host,
      image_data,
      image_url,
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

        image_kind: z.enum(IMAGE_KINDS),
        image_data: z
          .string()
          .min(1, "Image data is required")
          .optional(),
        image_url: z
          .string()
          .url("Image URL is required")
          .optional(),
        image_type: z
          .string()
          .min(1, "Image type is required")
          .optional(),

        resource_kind: z.enum(RESOURCE_KINDS),
        resource_id: z
          .string()
          .min(1, "Resource ID is required"),
      }),
    ),
  ]);

  if (!canModifyResource(user, resource_kind, resource_id)) {
    throw error(403, `You don't have access to this ${resource_kind}.`);
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
      const path: FilePathDefinition = {
        folderPath: `/images/${resource_kind}/${resource_id}/${image_kind}`,
        // NOTE: Don't use existingImages as the name, because it's not guaranteed to be unique
        fileName: `{UNIQUE_DIGITS_10}{ORIGINAL_FILE_EXT}`,
      };

      let uploadResult: Suc<FileDetails> | Err<unknown>;

      if (image_data) {
        uploadResult = await UploadJS.managedUpload({
          path,
          image_data,
          mime: image_type,
        });
      } else if (image_url) {
        uploadResult = await UploadJS.uploadFromUrl({
          url: image_url,
          mime: image_type,
          path,
        });
      } else {
        throw error(400, "Image data or URL is required");
      }

      if (uploadResult.ok) {
        const image = await Images.create({
          host,
          image_kind,
          resource_id,
          resource_kind,
          data: uploadResult.data,
        });

        return json(suc(image));
      } else {
        throw error(500, "Image upload failed");
      }
    }

    default: {
      throw error(400, "Invalid image host");
    }
  }
};
