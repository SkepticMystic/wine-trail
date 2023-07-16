<script lang="ts">
  import { LINK_EMOJI, LINK_KINDS } from "$lib/const/links";
  import type { Studio } from "$lib/models/Studio";

  export let links: Studio["links"];
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
</div>
