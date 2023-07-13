import type { ResourceKind } from "$lib/const/pendingPatches";
import type { Result, SID } from "$lib/interfaces";
import type { Image } from "$lib/models/Images";
import { err } from "$lib/utils";
import { getHTTPErrorMsg } from "$lib/utils/errors";
import axios from "axios";
import { get, writable } from "svelte/store";
import { addToast } from "./toast";

const store = writable<
  SID<
    Pick<
      Image,
      "data" | "host" | "image_kind" | "resource_id" | "resource_kind"
    >
  >[]
>(
  [],
);

export const images = {
  ...store,

  getResourceImages: (resource_kind: ResourceKind, resource_id: string) => {
    const images = get(store);
    return images.filter(
      (image) =>
        image.resource_kind === resource_kind &&
        image.resource_id === resource_id,
    );
  },

  create: async (
    image_data: string,
    image_type: string,
    meta: Pick<Image, "host" | "image_kind" | "resource_kind" | "resource_id">,
  ) => {
    try {
      const { data } = await axios.post<Result<SID<Image>, unknown>>(
        "/api/images",
        {
          ...meta,
          image_data,
          image_type,
        },
      );

      console.log(data);
      if (data.ok) {
        images.update((current) => [
          ...current,
          data.data,
        ]);

        addToast({
          type: "success",
          message: "Image uploaded successfully.",
          duration_ms: 5_000,
        });
      } else {
        addToast({
          type: "error",
          message: "Image upload failed.",
        });
      }

      return data;
    } catch (error) {
      console.log(error);
      const message = getHTTPErrorMsg(error);

      addToast({
        type: "error",
        message,
      });

      return err(message);
    }
  },

  delete: async (image_id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return err("Image deletion cancelled.");
    }

    try {
      const { data } = await axios.delete<Result<undefined, undefined>>(
        `/api/images/${image_id}`,
      );

      console.log(data);
      if (data.ok) {
        images.update((current) =>
          current.filter((image) => image._id !== image_id)
        );

        addToast({
          type: "success",
          message: "Image deleted successfully.",
          duration_ms: 5_000,
        });
      } else {
        addToast({
          type: "error",
          message: "Image deletion failed.",
        });
      }

      return data;
    } catch (error) {
      console.log(error);
      const message = getHTTPErrorMsg(error);

      addToast({
        type: "error",
        message,
      });

      return err(message);
    }
  },
};
