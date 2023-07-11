<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let links: Studio["links"];
  export let schedule: Studio["schedule"];
</script>

<div class="flex flex-wrap gap-3 items-center">
  {#each Object.entries(links ?? {}) as [type, href]}
    {#if type === "website"}
      <a {href} class="link link-secondary" target="_blank" rel="norefferer">
        🌍 Website
      </a>
    {:else if type === "facebook"}
      <a {href} class="link link-secondary" target="_blank" rel="norefferer">
        📘 Facebook
      </a>
    {:else if type === "instagram"}
      <a {href} class="link link-secondary" target="_blank" rel="norefferer">
        📸 Instagram
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
