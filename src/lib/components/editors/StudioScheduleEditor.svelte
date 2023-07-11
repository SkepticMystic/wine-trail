<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import Label from "../label.svelte";

  export let schedule: Studio["schedule"];
</script>

<Label lbl="Kind">
  <select class="capitalize select" bind:value={schedule.kind}>
    {#each ["none", "studio-site", "book-a-mat"] as kind}
      <option value={kind}>{kind}</option>
    {/each}
  </select>
</Label>

{#if schedule.kind !== "none"}
  <Label lbl="Link">
    <input type="url" class="input" bind:value={schedule.data} />
  </Label>
{/if}
