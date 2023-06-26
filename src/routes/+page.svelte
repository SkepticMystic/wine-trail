<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import OpenDrawer from "$lib/components/drawer/OpenDrawer.svelte";
  import StudioCard from "$lib/components/listings/StudioCard.svelte";
  import { studioFilters } from "$lib/stores/studioFilters.js";

  export let data;

  let search: string = "";
</script>

<Hero />

<div class="flex gap-3">
  <OpenDrawer />
  <input type="text" class="input" bind:value={search} />
</div>

<div class="my-5 flex flex-wrap gap-5 justify-center">
  {#each data.studios.filter((studio) => {
    const searchTerm = search ? studio.name
          .toLowerCase()
          .includes(search) : true;

    const style = $studioFilters.styles.size ? studio.styles?.some( (style) => $studioFilters.styles.has(style) ) : true;

    return searchTerm && style;
  }) as studio, i (studio.slug)}
    <StudioCard {studio} />
  {/each}
</div>
