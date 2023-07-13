<script lang="ts">
  import type { SID } from "$lib/interfaces";
  import type { Studio } from "$lib/models/Studio";
  import { images } from "$lib/stores/images";
  import { uploadJSParams } from "$lib/utils/UploadJS/optimisation";
  import YogaStyleBadge from "./YogaStyleBadge.svelte";

  export let studio: SID<Studio>;

  const { name, description, slug, styles } = studio;
  const studioImages = images.getResourceImages("studio", studio._id);

  const logo = studioImages.find((i) => i.image_kind === "logo")?.data.fileUrl;
</script>

<a
  href="/studios/{slug}"
  style="background-image: url({logo
    ? `${logo}?${uploadJSParams({ w: 300, h: 300 })}`
    : ''});"
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
