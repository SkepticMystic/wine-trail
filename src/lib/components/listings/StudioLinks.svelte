<script lang="ts">
  import { LINK_EMOJI, LINK_KINDS } from "$lib/const/links";
  import type { Studio } from "$lib/models/Studio";

  export let links: Studio["links"];
  export let schedule: Studio["schedule"];
</script>

<div class="flex flex-wrap gap-3 items-center">
  {#each LINK_KINDS as linkKind}
    {@const href = links[linkKind]}
    {#if href}
      <a
        {href}
        class="capitalize link link-secondary"
        target="_blank"
        rel="norefferer"
      >
        {LINK_EMOJI[linkKind]}
        {linkKind}
      </a>
    {/if}
  {/each}

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
