<script lang="ts">
  import { IMAGE_KIND_MAX_COUNTS } from "$lib/const/images";
  import { images } from "$lib/stores/images";
  import { getProps } from "$lib/utils";
  import { uploadJSParams } from "$lib/utils/UploadJS/optimisation";
  import Loading from "../Loading.svelte";
  import UploadImage from "../UploadImage.svelte";
  import XMark from "../icons/xMark.svelte";
  import Label from "../label.svelte";

  export let studio_id: string;

  let { loadObj } = getProps();

  const deleteImage = async (image_id: string) => {
    loadObj["delete" + image_id] = true;

    await images.delete(image_id);

    loadObj["delete" + image_id] = false;
  };

  $: studioImages = $images
    ? images.getResourceImages("studio", studio_id)
    : [];

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

<div class="flex flex-wrap gap-7">
  {#each studioImages as image}
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
        src="{image.data.fileUrl}?{uploadJSParams({ w: 100, h: 100 })}"
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
      resource_kind="studio"
      resource_id={studio_id}
    />
  </Label>

  <Label lbl="Other Images ({IMAGE_KIND_MAX_COUNTS['other']} max)">
    <UploadImage
      host="uploadjs"
      image_kind="other"
      resource_kind="studio"
      resource_id={studio_id}
    />
  </Label>
</div>
