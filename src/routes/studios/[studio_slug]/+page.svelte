<script lang="ts">
  import StudioContact from "$lib/components/listings/StudioContact.svelte";
  import StudioLinks from "$lib/components/listings/StudioLinks.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import Leaflet from "$lib/components/map/Leaflet.svelte";

  export let data;
</script>

<div class="">
  <h1 class="text-3xl font-semibold text-center">
    {data.studio.name}
  </h1>

  <div class="flex flex-wrap gap-7 my-7">
    <img
      src={data.studio.logo}
      width={384}
      height={384}
      class="rounded-box aspect-square"
      alt="{data.studio.name} logo"
    />

    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap gap-3">
        <StudioLinks
          links={data.studio.links}
          schedule={data.studio.schedule}
        />
        <StudioContact contact={data.studio.contact} />
      </div>

      <p class="max-w-lg text-gray-700 font-serif">
        {data.studio.description}
      </p>

      <div class="flex flex-wrap gap-2">
        {#each data.studio.styles ?? [] as style}
          <YogaStyleBadge {style} />
        {/each}
      </div>
    </div>
  </div>

  <hr class="my-7" />

  {#if data.studio.moreImages}
    <div class="flex flex-wrap gap-3 my-5">
      {#each data.studio.moreImages as img}
        <img
          width={384}
          class="aspect-square object-cover hover:scale-105 transition-all rounded-box"
          src={img}
          alt="{data.studio.name} image"
        />
      {/each}
    </div>
  {/if}

  {#if data.studio.location.coordinates}
    <Leaflet coordinates={data.studio.location.coordinates} />
  {/if}
</div>
