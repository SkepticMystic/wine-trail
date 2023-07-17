<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import { buildLocationArray, buildLocationStr } from "$lib/utils/locations";

  export let location: Studio["location"];

  $: locationArray = buildLocationArray(location);
  $: locationStrFull = buildLocationStr(locationArray, false);
  $: locationStrPreview = buildLocationStr(locationArray, true);
</script>

{#if locationArray.length}
  <a
    href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
      locationStrFull
    )}"
    target="_blank"
    rel="norefferer"
    class="link capitalize text-sm"
  >
    📍 {locationStrPreview}
  </a>
{/if}
