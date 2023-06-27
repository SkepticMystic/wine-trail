<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import StudioContact from "$lib/components/listings/StudioContact.svelte";
  import StudioLinks from "$lib/components/listings/StudioLinks.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import Leaflet from "$lib/components/map/Leaflet.svelte";
  import { studios } from "$lib/stores/studios";

  const studio = $studios.find(
    (studio) => studio.slug === $page.params.studio_slug
  );
</script>

{#if studio}
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-semibold text-center">
      {studio.name}
    </h1>

    <div class="flex flex-wrap gap-7 my-7">
      <img
        src={studio.logo}
        width={384}
        height={384}
        class="self-start rounded-box aspect-square"
        alt="{studio.name} logo"
      />

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          {#each studio.styles ?? [] as style}
            <YogaStyleBadge
              {style}
              title="View studios that offer {style} yoga"
              on:click={async () => await goto(`/?style=${style}`)}
            />
          {/each}
        </div>

        <p class="max-w-xl text-gray-700 font-serif">
          {studio.description}
        </p>

        <div class="flex flex-wrap gap-3">
          <StudioLinks links={studio.links} schedule={studio.schedule} />
          <StudioContact contact={studio.contact} />
        </div>

        <div />
      </div>
    </div>

    <hr class="my-7" />

    {#if studio.moreImages}
      <div class="flex flex-wrap justify-center gap-3 my-5">
        {#each studio.moreImages as img}
          <div class="overflow-hidden rounded-box">
            <img
              width={384}
              class="aspect-square object-cover hover:scale-110 transition-all"
              src={img}
              alt="{studio.name} image"
            />
          </div>
        {/each}
      </div>
    {/if}
  </div>

  {#if studio.location.coordinates}
    <div class="block">
      <Leaflet coordinates={studio.location.coordinates} />
    </div>
  {/if}
{:else}
  <p>Studio not found</p>
{/if}
