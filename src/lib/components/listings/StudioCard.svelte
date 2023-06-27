<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import { studioFilters } from "$lib/stores/studioFilters";
  import YogaStyleBadge from "./YogaStyleBadge.svelte";

  export let studio: Studio;

  const { name, description, logo, slug, styles } = studio;
</script>

<div class="card card-compact w-[350px] bg-base-100 shadow-lg">
  <a href="/studios/{slug}">
    <!-- width must match w-width above -->
    <img
      class="rounded-t-box aspect-square"
      src={logo}
      alt={name}
      width={350}
    />
  </a>

  <div class="card-body">
    <h2 class="card-title">{name}</h2>
    <p class="font-serif">
      {description.slice(0, 250)}{description.length > 250 ? "..." : ""}
    </p>

    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap gap-1">
        {#each (styles ?? []).slice(0, 5) as style}
          <YogaStyleBadge
            {style}
            size="md"
            title="Show studios that offer {style} yoga"
            on:click={() => {
              $studioFilters.styles.add(style);
              $studioFilters = $studioFilters;
            }}
          />
        {/each}
      </div>

      <a href="/studios/{slug}">
        <button class="btn btn-sm btn-secondary"> See Studio </button>
      </a>
    </div>
  </div>
</div>
