<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import Modal from "../Modal.svelte";

  export let studio: Studio;
</script>

<Modal openButtonText="View Studio">
  <h2 class="text-xl">{studio.name}</h2>
</Modal>
