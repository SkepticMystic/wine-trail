<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import ImageCarousel from "../ImageCarousel.svelte";
  import Modal from "../Modal.svelte";

  export let studio: Studio;
</script>

<Modal openButtonText="View Studio">
  <h2 class="text-xl">{studio.name}</h2>

  {#if studio.moreImages?.length}
    <ImageCarousel images={studio.moreImages} />
  {/if}
</Modal>
