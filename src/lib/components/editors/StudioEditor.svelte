<script lang="ts">
  import { YOGA_STYLES, YOGA_STYLE_EMOJI } from "$lib/const/styles";
  import type { ModifyStudio } from "$lib/models/Studio";
  import Label from "../label.svelte";

  export let studio: ModifyStudio;
</script>

<div class="flex flex-col gap-7">
  <div class="flex flex-wrap gap-3">
    <Label lbl="Name">
      <input type="text" class="input" bind:value={studio.name} />
    </Label>

    <Label lbl="Hidden">
      <input
        type="checkbox"
        class="checkbox checkbox-lg"
        bind:checked={studio.hidden}
      />
    </Label>
  </div>

  <Label lbl="Description">
    <textarea
      class="textarea"
      rows="8"
      cols="60"
      bind:value={studio.description}
    />
  </Label>

  <Label lbl="Styles">
    <select class="select capitalize" multiple bind:value={studio.styles}>
      {#each YOGA_STYLES as style}
        <option value={style}> {YOGA_STYLE_EMOJI[style]} {style} </option>
      {/each}
    </select>
  </Label>

  <Label lbl="Online Classes">
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={studio.onlineClasses}
    />
  </Label>

  <Label lbl="Logo">
    <input type="text" class="input" bind:value={studio.logo} />
  </Label>

  <div class="flex flex-wrap gap-3">
    <Label lbl="Website">
      <input type="text" class="input" bind:value={studio.links.website} />
    </Label>
    <Label lbl="Facebook">
      <input type="text" class="input" bind:value={studio.links.facebook} />
    </Label>
    <Label lbl="Instagram">
      <input type="text" class="input" bind:value={studio.links.instagram} />
    </Label>
  </div>

  <div class="flex flex-wrap gap-3">
    <Label lbl="Phone Number">
      <input type="text" class="input" bind:value={studio.contact.phone} />
    </Label>
    <Label lbl="Email">
      <input type="text" class="input" bind:value={studio.contact.email} />
    </Label>
  </div>

  <div class="flex flex-wrap gap-3">
    <Label lbl="Country">
      <input type="text" class="input" bind:value={studio.location.country} />
    </Label>
    <Label lbl="Province">
      <input type="text" class="input" bind:value={studio.location.province} />
    </Label>

    <Label lbl="City">
      <input type="text" class="input" bind:value={studio.location.city} />
    </Label>
    <Label lbl="Town">
      <input type="text" class="input" bind:value={studio.location.town} />
    </Label>
  </div>
</div>
