<script lang="ts">
  import { YOGA_STYLE_EMOJI, type YogaStyle } from "$lib/const/styles";
  import type { Tailwind } from "$lib/const/tailwind";
  import { createEventDispatcher } from "svelte";

  export let style: YogaStyle;
  export let size: Tailwind.Size = "lg";
  export let colour: Tailwind.Colour = "info";

  export let cls: string = "";

  const dispatch = createEventDispatcher();

  const badgeSizes: Record<Tailwind.Size, string> = {
    xs: "badge-xs",
    sm: "badge-sm",
    md: "badge-md",
    lg: "badge-lg",
    xl: "badge-xl",
  };

  const badgeColours: Record<Tailwind.Colour, string> = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    neutral: "badge-neutral",
    info: "badge-info",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
  };
</script>

<button
  class="badge {badgeSizes[size]} {badgeColours[
    colour
  ]} bg-opacity-70 font-mono capitalize {cls}"
  on:click={() => dispatch("click")}
>
  {YOGA_STYLE_EMOJI[style]}{style}
</button>
