<script lang="ts">
  import type { SID } from "$lib/interfaces";
  import type { ModifyStudio } from "$lib/models/Studio";
  import StudioLocation from "../listings/StudioLocation.svelte";
  import AddressAutocompleteSelector from "../selectors/AddressAutocompleteSelector.svelte";
  import ResourceBasicEditor from "./ResourceBasicEditor.svelte";
  import ResourceContactEditor from "./ResourceContactEditor.svelte";
  import ResourceImagesEditor from "./ResourceImagesEditor.svelte";
  import ResourceLinksEditor from "./ResourceLinksEditor.svelte";
  import ResourceStylesEditor from "./ResourceStylesEditor.svelte";
  import StudioScheduleEditor from "./StudioScheduleEditor.svelte";

  export let studio: ModifyStudio & Partial<SID<{}>>;
</script>

<div class="flex flex-col gap-5">
  <ResourceBasicEditor
    resource_kind="studio"
    bind:name={studio.name}
    bind:description={studio.description}
    bind:hidden={studio.hidden}
  />

  <ResourceStylesEditor resource_kind="studio" bind:styles={studio.styles} />

  <div class="basic-card">
    <h2 class="text-2xl">Schedule</h2>

    <p class="text-base-content opacity-80 mt-1">
      Do you have a schedule online? You can either link to a schedule on your
      own site, or on Book A Mat.
    </p>

    <div class="flex items-end flex-wrap gap-3">
      <StudioScheduleEditor bind:schedule={studio.schedule} />
      <label class="label gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-lg checkbox-primary"
          bind:checked={studio.onlineClasses}
        />
        <span class="font-semibold">Online Classes 🎦</span>
      </label>
    </div>
  </div>

  <ResourceLinksEditor resource_kind="studio" bind:links={studio.links} />

  <ResourceContactEditor resource_kind="studio" bind:contact={studio.contact} />

  <div class="basic-card">
    <h2 class="text-2xl">Location</h2>

    <p class="text-base-content opacity-80 mt-1 mb-2">
      Where is your studio located? You can add a street address, or just a city
      or town.
    </p>

    <div class="mb-2">
      <StudioLocation location={studio.location} />
    </div>
    <AddressAutocompleteSelector bind:location={studio.location} />
  </div>

  {#if studio._id}
    <div class="basic-card">
      <h2 class="text-2xl">Images</h2>

      <p class="text-base-content opacity-80 mt-1 my-3">
        Upload some images of your studio. You can add a logo, as well as some
        other images showcasing your studio.
      </p>

      <ResourceImagesEditor resource_id={studio._id} resource_kind="studio" />
    </div>
  {/if}
</div>
