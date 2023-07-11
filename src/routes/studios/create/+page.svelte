<script lang="ts">
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/Loading.svelte";
  import StudioEditor from "$lib/components/editors/StudioEditor.svelte";
  import type { ModifyStudio } from "$lib/models/Studio";
  import { studios } from "$lib/stores/studios";
  import { getProps } from "$lib/utils";

  let { loadObj } = getProps();

  let studio: ModifyStudio = {
    name: "",
    description: "",

    styles: [],
    onlineClasses: false,

    logo: "",
    moreImages: [],

    contact: {
      email: undefined,
      phone: undefined,
    },
    links: {
      facebook: undefined,
      instagram: undefined,
      website: undefined,
    },
    location: {
      country: "ZA",
      city: undefined,
      coordinates: undefined,
      province: undefined,
      town: undefined,
    },
    schedule: {
      data: undefined,
      kind: "studio-site",
    },
  };

  const createStudio = async () => {
    if (!studio) return;

    loadObj["create"] = true;

    const result = await studios.create(studio);

    if (result.ok) {
      await goto(`/studios/${result.data.studio.slug}/edit`);
    }

    loadObj["create"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

{#if studio}
  <div class="flex flex-col gap-3">
    <StudioEditor bind:studio />

    <button
      class="btn btn-primary"
      disabled={anyLoading}
      on:click={createStudio}
    >
      <Loading loading={loadObj["create"]} />
      Create new studio
    </button>
  </div>
{/if}
