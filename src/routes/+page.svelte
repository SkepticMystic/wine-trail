<script lang="ts">
  import { page } from "$app/stores";
  import Hero from "$lib/components/Hero.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import Badge from "$lib/components/daisyui/badge.svelte";
  import OpenDrawer from "$lib/components/drawer/OpenDrawer.svelte";
  import StudioCard from "$lib/components/listings/StudioCard.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import type { YogaStyle } from "$lib/const/styles.js";
  import { studioFilters } from "$lib/stores/studioFilters.js";
  import { studios } from "$lib/stores/studios";
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

    const city =
      $studioFilters.location.city.size && studio.location.city
        ? $studioFilters.location.city.has(studio.location.city)
        : true;

    const style = $studioFilters.styles.size
      ? studio.styles?.some((style) => $studioFilters.styles.has(style))
      : true;

    return searchTerm && city && style;
  });
</script>

<Hero />

<div class="flex gap-5 justify-center items-center">
  <OpenDrawer />
  <input
    type="text"
    class="input"
    placeholder="Search Studios by Name"
    bind:value={search}
  />

  <p>
    <code>{filtered.length}</code> of <code>{$studios.length}</code> studios
  </p>
</div>

<div class="my-5 flex flex-wrap gap-1 justify-center">
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
<div class="my-5 flex flex-wrap gap-1 justify-center">
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

<Loading loading={$studios.length === 0}>
  <div class="my-5 flex flex-wrap gap-5 justify-center">
    {#each filtered as studio, i (studio.slug)}
      <StudioCard {studio} />
    {/each}
  </div>
</Loading>
