<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "$lib/components/Loading.svelte";
  import UploadImage from "$lib/components/UploadImage.svelte";
  import StudioEditor from "$lib/components/editors/StudioEditor.svelte";
  import { studios } from "$lib/stores/studios";
  import { getProps } from "$lib/utils";

  let { loadObj } = getProps();

  $: studio = $studios ? studios.getBySlug($page.params.studio_slug) : null;
  $: console.log(studio);

  const patchStudio = async () => {
    if (!studio) return;

    loadObj["patch"] = true;

    await studios.patch(studio._id, studio);

    loadObj["patch"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

{#if studio}
  <div class="flex flex-col gap-3">
    <h1 class="text-2xl font-semibold">Edit {studio.name}</h1>

    <StudioEditor bind:studio />

    <h2 class="text-xl mt-5 font-semibold">Images</h2>

    {#key studio}
      <div class="flex flex-wrap gap-3">
        {#each studio.images as image}
          <img
            src={image.host === "uploadjs"
              ? image.data.fileUrl.replace("/raw/", "/image/")
              : ""}
            alt=""
            width="300"
            height="300"
          />
        {/each}
      </div>
    {/key}

    <UploadImage
      host="uploadjs"
      image_kind="logo"
      resource_kind="studio"
      resource_id={studio._id.toString()}
      on:uploaded={(e) => {
        console.log("detail", e.detail);
        if (e.detail?.ok) {
          $studios = $studios.map((s) => {
            if (s._id === studio?._id) {
              return {
                ...studio,
                images: [
                  ...studio.images,
                  {
                    host: "uploadjs",
                    image_kind: "logo",
                    data: e.detail.data,
                  },
                ],
              };
            }
            return s;
          });
        }

        console.log($studios.find((s) => s._id === studio?._id));
      }}
    />

    <button
      class="btn btn-primary"
      disabled={anyLoading}
      on:click={patchStudio}
    >
      <Loading loading={loadObj["patch"]} />
      Save Changes
    </button>
  </div>
{/if}
