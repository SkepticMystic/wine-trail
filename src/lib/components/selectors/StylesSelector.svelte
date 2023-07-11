<script lang="ts">
  import {
    YOGA_STYLES,
    YOGA_STYLE_EMOJI,
    type YogaStyle,
  } from "$lib/const/styles";
  import Select from "svelte-select";

  export let styles: YogaStyle[] = [];

  const items = YOGA_STYLES.map((style) => ({
    id: style,
    label: `${YOGA_STYLE_EMOJI[style]} ${style}`,
  }));

  $: value = items.filter((style) => styles?.includes(style.id));

  function onInput(e: CustomEvent) {
    value = (e.detail as typeof items | null) ?? [];

    styles = value.map((style) => style.id);
  }
</script>

{#key styles}
  <Select
    {items}
    {value}
    multiple
    itemId="id"
    label="label"
    placeholder="Select Styles"
    on:input={onInput}
  />
{/key}
