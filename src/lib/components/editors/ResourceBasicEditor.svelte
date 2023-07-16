<script lang="ts">
  import type { ResourceKind } from "$lib/const/resources";
  import Label from "../label.svelte";

  export let resource_kind: ResourceKind;

  export let name: string;
  export let description: string;
  export let hidden: boolean | undefined;
</script>

<div class="basic-card">
  <h2 class="text-2xl">Basic Info</h2>

  <div class="flex items-end flex-wrap gap-3">
    <Label lbl="Name">
      <input type="text" class="input w-full" bind:value={name} />
    </Label>

    <label class="label gap-2">
      <input
        type="checkbox"
        class="checkbox checkbox-lg checkbox-warning"
        bind:checked={hidden}
      />
      <span class="font-semibold capitalize">Hide {resource_kind}</span>
    </label>
  </div>

  <div class="mt-2">
    <Label lbl="Description">
      <p class="text-base-content opacity-80 mb-2">
        Tell us about {resource_kind === "studio" ? "your studio" : "yourself"}.
        What makes {resource_kind === "studio" ? "it" : "you"} special? ✨
      </p>
      <textarea
        class="textarea w-full h-48 sm:w-96 md:h-72"
        bind:value={description}
      />
    </Label>
  </div>
</div>
