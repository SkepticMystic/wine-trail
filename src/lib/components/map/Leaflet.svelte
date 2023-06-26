<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import { onMount } from "svelte";

  export let coordinates: NonNullable<Studio["location"]["coordinates"]>;

  const coordArray = [coordinates.latitude, coordinates.longitude];

  onMount(() => {
    const map = L.map("map").setView(coordArray, 13);

    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   maxZoom: 19,
    //   attribution:
    //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // }).addTo(map);

    const marker = L.marker(coordArray).addTo(map);
  });
</script>

<div id="map" class="h-[400px]" />
