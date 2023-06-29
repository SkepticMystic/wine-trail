<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let location: Studio["location"];

  const locationArray = [
    location.town,
    location.city,
    location.province,
    location.country,
  ].filter(Boolean) as string[];
</script>

<div class="capitalize text-sm">
  📍 {locationArray.join(", ")}
</div>
