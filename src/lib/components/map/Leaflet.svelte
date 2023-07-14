<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import { buildLocationStr } from "$lib/utils/locations";
  import { onMount } from "svelte";

  export let studio: Studio;

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
      .tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      )
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
