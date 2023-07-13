import { UploadJS } from "$lib/APIs/uploadJS";
import type { Image } from "$lib/models/Images";
import { error } from "@sveltejs/kit";

export const deleteImageOnHost = async (
  image: Pick<Image, "host" | "data">,
) => {
  switch (image.host) {
    case "uploadjs": {
      return UploadJS.deleteFile({ path: { filePath: image.data.filePath } });
    }

    default: {
      throw error(500, "Unknown host.");
    }
  }
};
