<script lang="ts">
  import { YOGA_STYLES } from "$lib/const/styles";
  import { studioFilters } from "$lib/stores/studioFilters";
  import { studios } from "$lib/stores/studios";
  import { removeDuplicates, setToggle } from "$lib/utils/sets";
  import Modal from "../Modal.svelte";
  import Badge from "../daisyui/badge.svelte";
  import YogaStyleBadge from "../listings/YogaStyleBadge.svelte";

  $: cities = removeDuplicates(
    $studios.map((s) => s.location.city).filter(Boolean)
  ) as string[];
</script>

<Modal btnText="Filters" btnCls="btn-primary">
  <div slot="content">
    <ul class="menu bg-base-200">
      <li>
        <details open>
          <summary class="text-base font-semibold">Styles</summary>

          <ul class="flex flex-wrap gap-x-1.5 gap-y-1 py-2">
            {#each YOGA_STYLES as style}
              <li class="p-0">
                <YogaStyleBadge
                  {style}
                  colour={$studioFilters.styles.has(style)
                    ? "accent"
                    : "neutral"}
                  size="md"
                  cls="text-sm pt-0.5 pb-5 px-1.5"
                  on:click={() => {
                    setToggle($studioFilters.styles, style);
                    $studioFilters.styles = $studioFilters.styles;
                  }}
                />
              </li>
            {/each}
          </ul>
        </details>
      </li>

      <li>
        <details open>
          <summary class="text-base font-semibold">Location</summary>

          <ul class="flex flex-wrap gap-x-1.5 gap-y-1 py-2">
            {#each cities as city}
              <li class="p-0">
                <Badge
                  size="md"
                  colour={$studioFilters.location.city.has(city)
                    ? "accent"
                    : "neutral"}
                  cls="text-sm pt-0.5 pb-5 px-1.5"
                  on:click={() => {
                    setToggle($studioFilters.location.city, city);
                    $studioFilters = $studioFilters;
                  }}
                >
                  {city}
                </Badge>
              </li>
            {/each}
          </ul>
        </details>
      </li>
    </ul>
  </div>
</Modal>
