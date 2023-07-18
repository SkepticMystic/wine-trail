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

    <p class="text-base-content opacity-80 my-1">
      Do you have a schedule online? You can either link to a schedule on your
      own site, or on Book A Mat. Or you can upload an image of your schedule.
    </p>

    <div class="flex flex-col gap-3">
      <label class="label justify-normal gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-lg checkbox-primary"
          bind:checked={studio.onlineClasses}
        />
        <span class="font-semibold">Online Classes 🎦</span>
      </label>

      <StudioScheduleEditor
        studio_id={studio._id}
        bind:schedule={studio.schedule}
      />
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
        other images showcasing your studio. Make sure they're high quality, and
        square, if possible.
      </p>

      <ResourceImagesEditor
        resource_id={studio._id}
        resource_kind="studio"
        image_kinds={["logo", "other"]}
      />
    </div>
  {/if}
</div>
