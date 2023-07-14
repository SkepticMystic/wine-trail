<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "$lib/components/Loading.svelte";
  import StudioEditor from "$lib/components/editors/StudioEditor.svelte";
  import GoBack from "$lib/components/navigation/GoBack.svelte";
  import { studios } from "$lib/stores/studios";
  import { getProps } from "$lib/utils";

  let { loadObj } = getProps();

  let studio = studios.getBySlug($page.params.studio_slug);

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
    <h1 class="text-3xl flex gap-5 items-center">
      <GoBack />
      <span>Edit {studio.name}</span>
    </h1>

    <StudioEditor bind:studio />

    <div class="flex gap-3 mt-3">
      <GoBack colour="btn-neutral" />

      <button
        class="btn btn-primary grow"
        disabled={anyLoading}
        on:click={patchStudio}
      >
        <Loading loading={loadObj["patch"]} />
        Save Changes
      </button>
    </div>
  </div>
{/if}
