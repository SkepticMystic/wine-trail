<script lang="ts">
  import { SCHEDULE_KINDS } from "$lib/const/schedules";
  import type { Studio } from "$lib/models/Studio";
  import Label from "../label.svelte";
  import ResourceImagesEditor from "./ResourceImagesEditor.svelte";

  export let schedule: Studio["schedule"];
  // Might not have been saved yet. In which case, don't allow img uploads
  export let studio_id: string | undefined;
</script>

<div class="flex gap-3 items-end">
  <Label lbl="Schedule Kind">
    <select class="capitalize select" bind:value={schedule.kind}>
      {#each SCHEDULE_KINDS as kind}
        <option value={kind}>{kind}</option>
      {/each}
    </select>
  </Label>

  {#if schedule.kind === "book-a-mat" || schedule.kind === "studio-site"}
    <Label lbl="Link">
      <input type="url" class="input" bind:value={schedule.data} />
    </Label>
  {:else if schedule.kind === "image" && studio_id}
    <div class="flex flex-row-reverse gap-3 items-end">
      <ResourceImagesEditor
        resource_id={studio_id}
        resource_kind="studio"
        image_kinds={["schedule"]}
      />
    </div>
  {/if}
</div>
