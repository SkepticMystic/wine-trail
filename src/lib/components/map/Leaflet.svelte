<script lang="ts">
  import type { ModifyStudio } from "$lib/models/Studio";
  import { buildLocationStr } from "$lib/utils/locations";
  import { onMount } from "svelte";

  export let studio: ModifyStudio;

  const coordArray = [
    studio.location.coordinates.latitude,
    studio.location.coordinates.longitude,
  ];

  const locationStr = buildLocationStr(studio.location);

  onMount(() => {
    //@ts-expect-error
    const map = L
      //
      .map("map")
      .setView(coordArray, 13);

    //@ts-expect-error
    L
      //
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map);

    //@ts-expect-error
    const marker = L
      //
      .marker(coordArray)
      .addTo(map);

    marker
      .bindPopup(
        `
      <div class="flex flex-col gap-1">
        <h2 class="text-lg">${studio.name}</h2>
        <div class="capitalize">
          ${locationStr}
        </div>
        <div>
          <a class="link" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            locationStr
          )}">
            📍 View on Google Maps
          </a>
        </div>
      </div>
      `
      )
      .openPopup();
  });
</script>

<div id="map" class="h-[450px]" />
