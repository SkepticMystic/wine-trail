<script lang="ts">
  import type { ModifyStudio } from "$lib/models/Studio";
  import Label from "../label.svelte";
  import StudioLocation from "../listings/StudioLocation.svelte";
  import AddressAutocompleteSelector from "../selectors/AddressAutocompleteSelector.svelte";
  import StylesSelector from "../selectors/StylesSelector.svelte";
  import StudioScheduleEditor from "./StudioScheduleEditor.svelte";

  export let studio: ModifyStudio;
</script>

<div class="flex flex-col gap-3">
  <h2 class="text-xl mt-5 font-semibold">Basic Info</h2>
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

  <h2 class="text-xl mt-5 font-semibold">Styles</h2>
  <StylesSelector bind:styles={studio.styles} />

  <h2 class="text-xl mt-5 font-semibold">Schedule</h2>
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

  <h2 class="text-xl mt-5 font-semibold">Links</h2>
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

  <h2 class="text-xl mt-5 font-semibold">Contact Info</h2>
  <div class="flex flex-wrap gap-3">
    <Label lbl="Phone Number">
      <input type="text" class="input" bind:value={studio.contact.phone} />
    </Label>
    <Label lbl="Email">
      <input type="text" class="input" bind:value={studio.contact.email} />
    </Label>
  </div>

  <h2 class="text-xl mt-5 font-semibold">Location</h2>
  <StudioLocation location={studio.location} />

  <AddressAutocompleteSelector bind:location={studio.location} />
</div>
