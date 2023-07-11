<script lang="ts">
  import type { ModifyStudio } from "$lib/models/Studio";
  import Label from "../label.svelte";
  import StylesSelector from "../selectors/StylesSelector.svelte";
  import StudioScheduleEditor from "./StudioScheduleEditor.svelte";

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
    <StylesSelector bind:styles={studio.styles} />
  </Label>

  <div class="flex flex-wrap gap-3">
    <StudioScheduleEditor bind:schedule={studio.schedule} />

    <Label lbl="Online Classes">
      <input
        type="checkbox"
        class="checkbox"
        bind:checked={studio.onlineClasses}
      />
    </Label>
  </div>

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
