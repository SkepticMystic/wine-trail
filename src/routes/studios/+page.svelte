<script lang="ts">
  import { page } from "$app/stores";
  import StudioFilters from "$lib/components/filters/StudioFilters.svelte";
  import StudioCard from "$lib/components/listings/StudioCard.svelte";
  import type { SID } from "$lib/interfaces";
  import type { Studio } from "$lib/models/Studio";
  import { addToast } from "$lib/stores/toast";

  let filtered: SID<Studio>[] = [];

  addToast(
    {
      type: "info",
      message: `Welcome to Yoga List, and thanks for your interest! We're still building up our database at the moment.<br />
But you can view and edit the studios you own, in the mean time.`,
    },
    { clearQueue: true }
  );
</script>

<h1 class="text-center font-semibold text-3xl mb-5">
  <span>Yoga List Studios</span>
  {#if $page.data.user?.admin}
    <a href="/studios/create">
      <button class="btn btn-ghost btn-square" title="Create new Studio">
        ➕
      </button>
    </a>
  {/if}
</h1>

<StudioFilters bind:filtered />

<div
  class="my-5 flex flex-wrap gap-7 justify-center p-6 bg-base-100 border rounded-box w-fit"
>
  {#if filtered.length}
    {#each filtered as studio, i (studio.slug)}
      <StudioCard {studio} />
    {/each}
  {:else}
    <p class="text-center text-lg">
      No studios found. Try removing some filters.
    </p>
  {/if}
</div>
