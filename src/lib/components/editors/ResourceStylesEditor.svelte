<script lang="ts">
  import type { ResourceKind } from "$lib/const/pendingPatches";
  import type { YogaStyle } from "$lib/const/styles";
  import StylesSelector from "../selectors/StylesSelector.svelte";

  export let resource_kind: ResourceKind;

  export let styles: YogaStyle[] | undefined;
</script>

<div class="basic-card">
  <h2 class="text-2xl">Styles</h2>
  <p class="text-base-content opacity-80 mt-1 mb-2">
    What styles of yoga do you offer? Pick as many as you like. If you'd like us
    to add a style, please <a href="/contact" class="link link-secondary"
      >email us</a
    >.
  </p>
  <StylesSelector bind:styles />
</div>
