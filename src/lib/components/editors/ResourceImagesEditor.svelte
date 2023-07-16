<script lang="ts">
  import { IMAGE_KIND_MAX_COUNTS } from "$lib/const/images";
  import type { ResourceKind } from "$lib/const/pendingPatches";
  import { images } from "$lib/stores/images";
  import { getProps } from "$lib/utils";
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";
  import Loading from "../Loading.svelte";
  import UploadImage from "../UploadImage.svelte";
  import XMark from "../icons/xMark.svelte";
  import Label from "../label.svelte";

  export let resource_kind: ResourceKind;
  export let resource_id: string;

  let { loadObj } = getProps();

  const deleteImage = async (image_id: string) => {
    loadObj["delete" + image_id] = true;

    await images.delete(image_id);

    loadObj["delete" + image_id] = false;
  };

  $: resourceImages = $images
    ? images.getResourceImages(resource_kind, resource_id)
    : [];

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

<div class="flex flex-wrap gap-7">
  {#each resourceImages as image}
    <div class="flex flex-col gap-2">
      <div class="flex justify-between gap-2">
        <span class="capitalize">{image.image_kind}</span>

        <button
          class="btn btn-xs btn-warning btn-circle"
          title="Delete {image.image_kind} image"
          disabled={anyLoading}
          on:click={async () => await deleteImage(image._id)}
        >
          <Loading loading={loadObj["delete" + image._id]}>
            <XMark />
          </Loading>
        </button>
      </div>

      <img
        src={optimiseUploadJSImg(image.data.fileUrl, { w: 100, h: 100 })}
        class="rounded-box"
        alt=""
        width="100"
        height="100"
      />
    </div>
  {/each}
</div>

<div class="flex flex-wrap gap-3 mt-3">
  <Label lbl="Logo">
    <UploadImage
      host="uploadjs"
      image_kind="logo"
      {resource_kind}
      {resource_id}
    />
  </Label>

  <Label lbl="Other Images ({IMAGE_KIND_MAX_COUNTS['other']} max)">
    <UploadImage
      host="uploadjs"
      image_kind="other"
      {resource_kind}
      {resource_id}
    />
  </Label>
</div>
