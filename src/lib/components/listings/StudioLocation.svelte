<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let location: Studio["location"];

  $: locationArray = [
    location.houseNumber,
    location.street,
    location.town,
    location.city,
    location.postalCode,
    location.province,
    location.country,
  ].filter(Boolean) as string[];
</script>

<div class="capitalize text-sm">
  📍 {locationArray.join(", ")}
</div>
