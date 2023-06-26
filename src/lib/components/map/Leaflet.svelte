<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import { onMount } from "svelte";

  export let coordinates: NonNullable<Studio["location"]["coordinates"]>;

  const coordArray = [coordinates.latitude, coordinates.longitude];

  onMount(() => {
    const map = L.map("map").setView(coordArray, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(coordArray).addTo(map);
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
  <script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""
  ></script>
</svelte:head>

<div id="map" class="h-96" />
