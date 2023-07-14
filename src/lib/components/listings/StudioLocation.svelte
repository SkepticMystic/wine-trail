<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import { buildLocationStr } from "$lib/utils/locations";

  export let location: Studio["location"];

  $: locationStr = buildLocationStr(location);
</script>

{#if locationStr}
  <a
    href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
      locationStr
    )}"
    target="_blank"
    rel="norefferer"
    class="link capitalize text-sm"
  >
    📍 {locationStr}
  </a>
{/if}
