<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let location: Studio["location"];

  $: locationStr = [
    location.houseNumber,
    location.street,
    location.town,
    location.city,
    location.postalCode,
    location.province,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");
</script>

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
