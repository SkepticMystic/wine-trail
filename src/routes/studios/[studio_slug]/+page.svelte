<script lang="ts">
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";
  import StudioLinks from "$lib/components/listings/StudioLinks.svelte";
  import Leaflet from "$lib/components/map/Leaflet.svelte";

  export let data;
</script>

<div>
  <h1 class="text-2xl font-semibold text-center">
    {data.studio.name}
  </h1>

  <StudioLinks links={data.studio.links} />

  {#if data.studio.moreImages}
    <ImageCarousel images={data.studio.moreImages} />
  {/if}

  {#if data.studio.location.coordinates}
    <Leaflet coordinates={data.studio.location.coordinates} />
  {/if}
</div>
