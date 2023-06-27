<script lang="ts">
  import { YOGA_STYLE_EMOJI, type YogaStyle } from "$lib/const/styles";
  import type { Tailwind } from "$lib/const/tailwind";
  import { createEventDispatcher } from "svelte";
  import Badge from "../daisyui/badge.svelte";

  export let style: YogaStyle;
  export let size: Tailwind.Size = "lg";
  export let colour: Tailwind.Colour = "info";
  export let title: string = "";

  export let cls: string = "";

  const dispatch = createEventDispatcher();
</script>

<Badge {size} {colour} {title} on:click={() => dispatch("click")} {cls}>
  {YOGA_STYLE_EMOJI[style]}{style}
</Badge>
