import type { Result, SID } from "$lib/interfaces";
import type { ModifyStudio, Studio } from "$lib/models/Studio";
import { err } from "$lib/utils";
import { getHTTPErrorMsg } from "$lib/utils/errors";
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

  create: async (studio: ModifyStudio) => {
    try {
      const { data } = await axios.post<
        Result<
          { studio: SID<Studio> },
          string
        >
      >("/api/studios", studio);

      console.log(data);

      if (data.ok) {
        store.update((studios) => [...studios, data.data.studio]);

        addToast({
          type: "success",
          message: "Studio created",
          duration_ms: 5_000,
        });
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
        message: getHTTPErrorMsg(error),
        duration_ms: 5_000,
      });

      return err("Error creating studio");
    }
  },

  patch: async (_id: string, patch: Partial<ModifyStudio>) => {
    try {
      const { data } = await axios.patch<
        Result<
          { studio?: SID<Studio> },
          string
        >
      >(
        `/api/studios/${_id}`,
        patch,
      );

      console.log(data);

      if (data.ok) {
        if (data.data.studio) {
          const newStudio = data.data.studio;
          store.update((studios) =>
            studios.map((studio) => studio._id === _id ? newStudio : studio)
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

  inviteOwner: async (studio_id: string, email: string) => {
    if (
      !confirm(
        `Are you sure you want to invite ${email} to be an owner of this studio?`,
      )
    ) {
      return err("Owner invite cancelled");
    }

    try {
      const { data } = await axios.post<Result<undefined, string>>(
        `/api/studios/${studio_id}/invite`,
        { email },
      );

      console.log(data);

      if (data.ok) {
        addToast({
          type: "success",
          message: "Owner invite sent",
          duration_ms: 5_000,
        });
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
        message: "Error inviting owner",
        duration_ms: 5_000,
      });

      return err("Error inviting owner");
    }
  },

  delete: async (_id: string) => {
    if (!confirm("Are you sure you want to delete this studio?")) {
      return err("Studio not deleted");
    }

    try {
      const { data } = await axios.delete<Result<undefined, string>>(
        `/api/studios/${_id}`,
      );

      console.log(data);

      if (data.ok) {
        store.update((studios) =>
          studios.filter((studio) => studio._id !== _id)
        );

        addToast({
          type: "success",
          message: "Studio deleted",
          duration_ms: 5_000,
        });
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
        message: "Error deleting studio",
        duration_ms: 5_000,
      });

      return err("Error deleting studio");
    }
  },
};
