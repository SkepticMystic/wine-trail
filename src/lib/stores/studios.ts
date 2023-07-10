import type { Result, SID } from "$lib/interfaces";
import type { ModifyStudio, Studio } from "$lib/models/Studio";
import { err } from "$lib/utils";
import axios from "axios";
import { get, writable } from "svelte/store";
import { addToast } from "./toast";

const store = writable<SID<Studio>[]>([]);

export const studios = {
  ...store,

  getBySlug: (slug: string) => {
    const studios = get(store);
    return studios.find((studio) => studio.slug === slug);
  },

  patch: async (_id: string, patch: Partial<ModifyStudio>) => {
    try {
      const { data } = await axios.patch<
        Result<
          { studio: SID<Studio> },
          string
        >
      >(
        `/api/studios/${_id}`,
        patch,
      );

      console.log(data);

      if (data.ok) {
        if (data.data.studio) {
          store.update((studios) =>
            studios.map((studio) =>
              studio._id === _id ? data.data.studio : studio
            )
          );

          addToast({
            type: "success",
            message: "Studio updated",
            duration_ms: 5_000,
          });
        } else {
          addToast({
            type: "success",
            message: "Studio update pending approval",
            duration_ms: 5_000,
          });
        }
      } else {
        console.warn(data.error);
        addToast({
          type: "warning",
          message: data.error,
          duration_ms: 5_000,
        });
      }

      return data;
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: "Error updating studio",
        duration_ms: 5_000,
      });

      return err("Error updating studio");
    }
  },
};
