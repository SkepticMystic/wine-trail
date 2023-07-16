<script lang="ts">
  import { page } from "$app/stores";
  import Badge from "$lib/components/daisyui/badge.svelte";
  import StudioCard from "$lib/components/listings/StudioCard.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import StudioFiltersModal from "$lib/components/modals/StudioFiltersModal.svelte";
  import type { YogaStyle } from "$lib/const/styles.js";
  import {
    DEFAULT_STUDIO_FILTERS,
    studioFilters,
  } from "$lib/stores/studioFilters.js";
  import { studios } from "$lib/stores/studios";
  import { addToast } from "$lib/stores/toast";
  import { setToggle } from "$lib/utils/sets.js";

  let search: string = "";
  const queryStyle = $page.url.searchParams.get("style");
  if (queryStyle) {
    $studioFilters.styles.add(queryStyle as YogaStyle);
  }

  $: filtered = $studios.filter((studio) => {
    const searchTerm = search
      ? studio.name.toLowerCase().includes(search.toLowerCase())
      : true;

    const city = $studioFilters.location.city.size
      ? studio.location.city
        ? $studioFilters.location.city.has(studio.location.city)
        : false
      : true;

    const style = $studioFilters.styles.size
      ? studio.styles?.some((style) => $studioFilters.styles.has(style))
      : true;

    return searchTerm && city && style;
  });

  addToast(
    {
      type: "info",
      message: `Welcome to Yoga List, and thanks for your interest! We're still building up our database at the moment.<br />
But you can view and edit the studios you own, in the mean time.`,
    },
    { clearQueue: true }
  );
</script>

<h1 class="text-center font-semibold text-3xl mb-5">Yoga List Studios</h1>

<div class="flex flex-wrap gap-5 justify-center items-center">
  <StudioFiltersModal />

  <input
    type="text"
    class="input"
    placeholder="Search Studios by Name"
    bind:value={search}
  />

  {#if filtered.length !== $studios.length}
    <button
      class="btn btn-warning"
      on:click={() => {
        search = "";
        $studioFilters = { ...DEFAULT_STUDIO_FILTERS() };
      }}
    >
      Clear {filtered.length} Studios
    </button>
  {/if}
</div>

{#if $studioFilters.location.city.size}
  <div class="my-3 flex gap-3 items-center justify-center">
    <span class="font-semibold">Cities:</span>

    <div class="flex flex-wrap gap-1">
      {#each $studioFilters.location.city as city}
        <Badge
          title="Remove {city} from filter"
          on:click={() => {
            setToggle($studioFilters.location.city, city);
            $studioFilters = $studioFilters;
          }}
        >
          {city}
        </Badge>
      {/each}
    </div>
  </div>
{/if}

{#if $studioFilters.styles.size}
  <div class="my-3 flex gap-3 items-center justify-center">
    <span class="font-semibold">Styles:</span>

    <div class="flex flex-wrap gap-1 justify-center">
      {#each $studioFilters.styles as style}
        <YogaStyleBadge
          {style}
          title="Remove {style} from filter"
          on:click={() => {
            setToggle($studioFilters.styles, style);
            $studioFilters = $studioFilters;
          }}
        />
      {/each}
    </div>
  </div>
{/if}

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
