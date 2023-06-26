<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import OpenDrawer from "$lib/components/drawer/OpenDrawer.svelte";
  import StudioCard from "$lib/components/listings/StudioCard.svelte";

  export let data;

  let search: string = "";
</script>

<Hero />

<div class="flex gap-3">
  <OpenDrawer />
  <input type="text" class="input" bind:value={search} />
</div>

<div class="my-5 flex flex-wrap gap-5 justify-center">
  {#each data.studios.filter((studio) => (search ? studio.name
          .toLowerCase()
          .includes(search) : true)) as studio, i (studio.slug)}
    <StudioCard {studio} />
  {/each}
</div>
