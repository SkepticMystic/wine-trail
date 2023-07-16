<script lang="ts">
  import { page } from "$app/stores";
  import type { YogaStyle } from "$lib/const/styles";
  import {
    DEFAULT_STUDIO_FILTERS,
    studioFilters,
  } from "$lib/stores/studioFilters";
  import { studios } from "$lib/stores/studios";
  import { setToggle } from "$lib/utils/sets";
  import Badge from "../daisyui/badge.svelte";
  import YogaStyleBadge from "../listings/YogaStyleBadge.svelte";
  import StudioFiltersModal from "../modals/StudioFiltersModal.svelte";

  export let filtered: typeof $studios;

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
</script>

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
