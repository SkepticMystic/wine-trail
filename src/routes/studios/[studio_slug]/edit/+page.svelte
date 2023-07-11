<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "$lib/components/Loading.svelte";
  import StudioEditor from "$lib/components/editors/StudioEditor.svelte";
  import { studios } from "$lib/stores/studios";
  import { getProps } from "$lib/utils";

  let { loadObj } = getProps();

  let studio = studios.getBySlug($page.params.studio_slug);
  console.log(studio);

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
