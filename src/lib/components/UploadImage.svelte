<script lang="ts">
  import type { ImageHost, ImageKind } from "$lib/const/images";
  import type { ResourceKind } from "$lib/const/pendingPatches";
  import type { Result } from "$lib/interfaces";
  import { addToast } from "$lib/stores/toast";
  import { err, getProps } from "$lib/utils";
  import { getHTTPErrorMsg } from "$lib/utils/errors";
  import { readFileAsBinaryString } from "$lib/utils/files";
  import axios from "axios";
  import { createEventDispatcher } from "svelte";
  import type { FileDetails } from "upload-js-full";
  import Loading from "./Loading.svelte";

  export let host: ImageHost;
  export let resource_id: string;
  export let resource_kind: ResourceKind;
  export let image_kind: ImageKind;

  const dispatch = createEventDispatcher();
  let { loadObj } = getProps();
  let files: FileList;

  const uploadImage = async (image_data: string, file: File) => {
    loadObj["upload"] = true;

    try {
      const { data } = await axios.post<Result<FileDetails, unknown>>(
        "/api/images",
        {
          host,

          resource_id,
          resource_kind,

          image_data,
          image_kind,
          image_type: file.type,
        }
      );

      console.log(data);
      if (data.ok) {
        addToast({
          type: "success",
          message: "Image uploaded successfully.",
        });
      } else {
        addToast({
          type: "error",
          message: "Image upload failed.",
        });
      }

      dispatch("uploaded", data);
    } catch (error) {
      console.log(error);
      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });

      dispatch("uploaded", err(message));
    }

    loadObj["upload"] = false;
  };
</script>

<input
  type="file"
  class="file-input file-input-bordered"
  accept="image/*"
  bind:files
  on:change={() =>
    readFileAsBinaryString(files[0], uploadImage, { fileType: "image" })}
/>

<Loading loading={loadObj["upload"]} />
