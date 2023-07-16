<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let schedule: Studio["schedule"];
</script>

{#if schedule?.kind === "studio-site" || schedule?.kind === "book-a-mat"}
  <div class="flex flex-wrap gap-3 items-center">
    <a
      href={schedule.data}
      class="link link-secondary"
      target="_blank"
      rel="norefferer"
    >
      📅 Schedule
    </a>
  </div>
{/if}
