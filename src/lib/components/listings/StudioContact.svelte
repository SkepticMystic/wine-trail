<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let contact: Studio["contact"];
</script>

<div class="flex flex-wrap gap-3 items-center">
  {#each Object.entries(contact ?? {}) as [type, href]}
    {#if type === "email" && href}
      <a
        href="mailto:{href}"
        class="link link-secondary"
        target="_blank"
        rel="norefferer"
      >
        📧 Email
      </a>
    {:else if type === "phone" && href}
      <a
        href="tel:{href}"
        class="link link-secondary"
        target="_blank"
        rel="norefferer"
      >
        📞 Phone
      </a>
    {/if}
  {/each}
</div>
