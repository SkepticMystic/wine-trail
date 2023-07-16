<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let schedule: Studio["schedule"];
</script>

<div class="flex flex-wrap gap-3 items-center">
  {#if schedule?.kind === "studio-site" || schedule?.kind === "book-a-mat"}
    <a
      href={schedule.data}
      class="link link-secondary"
      target="_blank"
      rel="norefferer"
    >
      📅 Schedule
    </a>
  {/if}
</div>
