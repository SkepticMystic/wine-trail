<script lang="ts">
  import { CONTACT_EMOJI } from "$lib/const/contact";
  import { LINK_EMOJI, LINK_KINDS } from "$lib/const/links";
  import type { ModifyStudio } from "$lib/models/Studio";
  import Label from "../label.svelte";
  import StudioLocation from "../listings/StudioLocation.svelte";
  import AddressAutocompleteSelector from "../selectors/AddressAutocompleteSelector.svelte";
  import StylesSelector from "../selectors/StylesSelector.svelte";
  import StudioScheduleEditor from "./StudioScheduleEditor.svelte";

  export let studio: ModifyStudio;
</script>

<div class="flex flex-col gap-3">
  <h2 class="text-2xl mt-5 font-semibold">Basic Info</h2>
  <div class="flex items-end flex-wrap gap-3">
    <Label lbl="Name">
      <input type="text" class="input w-96" bind:value={studio.name} />
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

  <div>
    <Label lbl="Description">
      <p class="text-gray-700 mb-2">Tell us about your studio</p>
      <textarea
        class="textarea"
        rows="8"
        cols="60"
        bind:value={studio.description}
      />
    </Label>
  </div>

  <h2 class="text-2xl mt-5 font-semibold">Styles</h2>
  <p class="text-gray-700">
    What styles of yoga do you offer? Pick as many as you like.
  </p>
  <StylesSelector bind:styles={studio.styles} />

  <h2 class="text-2xl mt-5 font-semibold">Schedule</h2>
  <p class="text-gray-700">
    Do you have a schedule online? You can either link to a schedule on your own
    site, or on Book A Mat.
  </p>
  <div class="flex items-end flex-wrap gap-3">
    <StudioScheduleEditor bind:schedule={studio.schedule} />

    <label class="label gap-2">
      <input
        type="checkbox"
        class="checkbox checkbox-lg"
        bind:checked={studio.onlineClasses}
      />
      <span class="font-semibold">Online Classes</span>
    </label>
  </div>

  <h2 class="text-2xl mt-5 font-semibold">Links</h2>
  <p class="text-gray-700">
    Do you have a website, Facebook page, or Instagram account? Add them here.
  </p>
  <div class="flex flex-wrap gap-3">
    {#each LINK_KINDS as linkKind}
      <Label cls="capitalize" lbl="{LINK_EMOJI[linkKind]} {linkKind}">
        <input
          type="text"
          class="input w-[400px]"
          bind:value={studio.links[linkKind]}
        />
      </Label>
    {/each}
  </div>

  <h2 class="text-2xl mt-5 font-semibold">Contact Info</h2>
  <p class="text-gray-700">
    How can people get in touch with you? You can add a phone number, email
    address, or both.
  </p>
  <div class="flex flex-wrap gap-3">
    <Label lbl="{CONTACT_EMOJI['phone']} Phone Number">
      <input type="text" class="input" bind:value={studio.contact.phone} />
    </Label>
    <Label lbl="{CONTACT_EMOJI['email']} Email">
      <input type="text" class="input w-64" bind:value={studio.contact.email} />
    </Label>
  </div>

  <h2 class="text-2xl mt-5 font-semibold">Location</h2>
  <p class="text-gray-700">
    Where is your studio located? You can add a street address, or just a city
    or town.
  </p>
  <StudioLocation location={studio.location} />

  <AddressAutocompleteSelector bind:location={studio.location} />
</div>
