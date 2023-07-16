<script lang="ts">
  import { CONTACT_EMOJI } from "$lib/const/contact";
  import { LINK_EMOJI, LINK_KINDS } from "$lib/const/links";
  import type { SID } from "$lib/interfaces";
  import type { ModifyStudio } from "$lib/models/Studio";
  import Label from "../label.svelte";
  import StudioLocation from "../listings/StudioLocation.svelte";
  import AddressAutocompleteSelector from "../selectors/AddressAutocompleteSelector.svelte";
  import StylesSelector from "../selectors/StylesSelector.svelte";
  import StudioImagesEditor from "./StudioImagesEditor.svelte";
  import StudioScheduleEditor from "./StudioScheduleEditor.svelte";

  export let studio: ModifyStudio & Partial<SID<{}>>;
</script>

<div class="flex flex-col gap-5">
  <div class="p-4 bg-base-100 rounded-box border">
    <h2 class="text-2xl">Basic Info</h2>

    <div class="flex items-end flex-wrap gap-3">
      <Label lbl="Name">
        <input type="text" class="input w-full" bind:value={studio.name} />
      </Label>
      <label class="label gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-lg"
          bind:checked={studio.hidden}
        />
        <span class="font-semibold">Hide Studio</span>
      </label>
    </div>

    <div class="mt-2">
      <Label lbl="Description">
        <p class="text-base-content opacity-80 mb-2">
          Tell us about your studio. What makes it special? ✨
        </p>
        <textarea
          class="textarea w-full h-48 sm:w-96 md:h-72"
          bind:value={studio.description}
        />
      </Label>
    </div>
  </div>

  <div class="p-4 bg-base-100 rounded-box border">
    <h2 class="text-2xl">Styles</h2>
    <p class="text-base-content opacity-80 mt-1 mb-2">
      What styles of yoga do you offer? Pick as many as you like. If you'd like
      us to add a style, please <a href="/contact" class="link link-secondary"
        >email us</a
      >.
    </p>
    <StylesSelector bind:styles={studio.styles} />
  </div>

  <div class="p-4 bg-base-100 rounded-box border">
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
          class="checkbox checkbox-lg"
          bind:checked={studio.onlineClasses}
        />
        <span class="font-semibold">Online Classes 🎦</span>
      </label>
    </div>
  </div>

  <div class="p-4 bg-base-100 rounded-box border">
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
            bind:value={studio.links[linkKind]}
          />
        </Label>
      {/each}
    </div>
  </div>

  <div class="p-4 bg-base-100 rounded-box border">
    <h2 class="text-2xl">Contact Info</h2>

    <p class="text-base-content opacity-80 mt-1 mb-2">
      How can people get in touch with you? You can add a phone number, email
      address, or both.
    </p>

    <div class="flex flex-wrap gap-3">
      <Label lbl="{CONTACT_EMOJI['phone']} Phone Number">
        <input type="text" class="input" bind:value={studio.contact.phone} />
      </Label>
      <Label lbl="{CONTACT_EMOJI['email']} Email">
        <input
          type="text"
          class="input sm:w-64"
          bind:value={studio.contact.email}
        />
      </Label>
    </div>
  </div>

  <div class="p-4 bg-base-100 rounded-box border">
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
    <div class="p-4 bg-base-100 rounded-box border">
      <h2 class="text-2xl">Images</h2>

      <p class="text-base-content opacity-80 mt-1 my-3">
        Upload some images of your studio. You can add a logo, as well as some
        other images showcasing your studio.
      </p>
      <StudioImagesEditor studio_id={studio._id} />
    </div>
  {/if}
</div>
