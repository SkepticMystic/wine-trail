<script lang="ts">
  import { studios } from "$lib/stores/studios";
  import Select from "svelte-select";

  export let studio_ids: string[] = [];

  const items = $studios.map((studio) => ({
    id: studio._id,
    label: studio.name,
  }));

  $: value = items.filter((studio) => studio_ids?.includes(studio.id));

  function onInput(e: CustomEvent) {
    value = (e.detail as typeof items | null) ?? [];

    studio_ids = value.map((studio) => studio.id);
  }
</script>

{#key studio_ids}
  <Select
    {items}
    {value}
    multiple
    itemId="id"
    label="label"
    placeholder="Select Studios"
    on:input={onInput}
  />
{/key}
