<script lang="ts">
  import type { ImageHost, ImageKind } from "$lib/const/images";
  import type { ResourceKind } from "$lib/const/resources";
  import { images } from "$lib/stores/images";
  import { getProps } from "$lib/utils";
  import { readFileAsBinaryString } from "$lib/utils/files";
  import Loading from "./Loading.svelte";

  export let host: ImageHost;
  export let resource_id: string;
  export let resource_kind: ResourceKind;
  export let image_kind: ImageKind;

  let { loadObj } = getProps();
  let files: FileList;

  const uploadImage = async (image_data: string) => {
    loadObj["upload"] = true;

    await images.create(image_data, files[0].type, {
      host,
      image_kind,
      resource_id,
      resource_kind,
    });

    loadObj["upload"] = false;
  };
</script>

<div class="flex gap-3">
  <input
    type="file"
    class="file-input file-input-bordered file-input-secondary file-input-xs sm:file-input-sm md:file-input-md"
    accept="image/*"
    bind:files
    on:change={() =>
      readFileAsBinaryString(files[0], uploadImage, { fileType: "image" })}
  />

  <Loading loading={loadObj["upload"]} />
</div>
