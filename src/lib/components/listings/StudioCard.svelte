<script lang="ts">
  import type { Studio } from "$lib/models/Studio";
  import YogaStyleBadge from "./YogaStyleBadge.svelte";

  export let studio: Studio;

  const { name, description, logo, slug, styles } = studio;
</script>

<a
  href="/studios/{slug}"
  style="background-image: url({logo});"
  class="rounded-box w-[300px] h-[300px] shadow-lg group relative bg-cover bg-center"
>
  <div
    class="flex flex-col justify-between p-4 bg-opacity-10 bg-slate-400 absolute w-full h-full rounded-box hover:bg-opacity-90 hover:text-gray-50 text-gray-700"
  >
    <div class="group-hover:hidden">
      {studio.hidden ? "🚫 Hidden" : ""}
    </div>
    <h2 class="hidden group-hover:block text-xl text-center font-bold">
      {name}
    </h2>

    <p class="hidden group-hover:block font-serif text-sm">
      {description.slice(0, 275)}{description.length > 275 ? "..." : ""}
    </p>

    <div class="flex flex-wrap gap-1 justify-center">
      {#each (styles ?? []).slice(0, 5) as style}
        <YogaStyleBadge
          {style}
          size="md"
          cls="shadow-lg"
          title="Show studios that offer {style} yoga"
        />
      {/each}
    </div>
  </div>
</a>
