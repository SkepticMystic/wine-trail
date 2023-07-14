<script lang="ts">
  import type { TW } from "$lib/interfaces/tailwind";
  import ArrowLeft from "../icons/ArrowLeft.svelte";

  export let size: `btn-${TW.Size}` = "btn-md";
  export let colour: `btn-${TW.Colour}` = "btn-ghost";
</script>

<a href="." title="Go Back">
  <button class="btn btn-square {colour} {size}">
    <ArrowLeft />
  </button>
</a>
