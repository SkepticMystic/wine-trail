<script lang="ts">
  import { CONTACT_EMOJI } from "$lib/const/contact";
  import type { ResourceKind } from "$lib/const/pendingPatches";
  import type { Studio } from "$lib/models/Studio";
  import Label from "../label.svelte";

  export let resource_kind: ResourceKind;

  export let contact: Studio["contact"];
</script>

<div class="basic-card">
  <h2 class="text-2xl">Contact Info</h2>

  <p class="text-base-content opacity-80 mt-1 mb-2">
    How can people get in touch with you? You can add a phone number, email
    address, or both.
  </p>

  <div class="flex flex-wrap gap-3">
    <Label lbl="{CONTACT_EMOJI['phone']} Phone Number">
      <input type="text" class="input" bind:value={contact.phone} />
    </Label>
    <Label lbl="{CONTACT_EMOJI['email']} Email">
      <input type="text" class="input sm:w-64" bind:value={contact.email} />
    </Label>
  </div>
</div>
