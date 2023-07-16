<script lang="ts">
  import { LINK_EMOJI, LINK_KINDS } from "$lib/const/links";
  import type { ResourceKind } from "$lib/const/resources";
  import type { Studio } from "$lib/models/Studio";
  import Label from "../label.svelte";

  export let resource_kind: ResourceKind;

  export let links: Studio["links"];
</script>

<div class="basic-card">
  <h2 class="text-2xl">Links</h2>
  <p class="text-base-content opacity-80 mt-1">
    Do you have a website, Facebook page, or Instagram account? Add them here.
  </p>

  <div class="flex flex-wrap gap-3">
    {#each LINK_KINDS as linkKind}
      <Label cls="capitalize" lbl="{LINK_EMOJI[linkKind]} {linkKind}">
        <input
          type="text"
          class="input sm:w-[400px]"
          bind:value={links[linkKind]}
        />
      </Label>
    {/each}
  </div>
</div>
