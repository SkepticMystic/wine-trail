<script lang="ts">
  import type { SID } from "$lib/interfaces";
  import type { Studio } from "$lib/models/Studio";
  import { images } from "$lib/stores/images";
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";
  import YogaStyleBadge from "./YogaStyleBadge.svelte";

  export let studio: SID<Studio>;

  const { name, description, slug, styles } = studio;
  const studioImages = images.getResourceImages("studio", studio._id);

  const logo = studioImages.find((i) => i.image_kind === "logo")?.data.fileUrl;
</script>

<div class="flex flex-col gap-2">
  <h3 class="text-lg text-center font-semibold">{name}</h3>
  <a
    href="/studios/{slug}"
    style="background-image: url({logo
      ? optimiseUploadJSImg(logo, { w: 300, h: 300 })
      : ''});"
    class="rounded-box w-[230px] sm:w-[300px] h-[230px] sm:h-[300px] shadow-lg group relative bg-cover bg-center border"
  >
    <div
      class="flex flex-col justify-between p-4 bg-opacity-10 bg-slate-400 absolute w-full h-full rounded-box hover:bg-opacity-90 hover:text-gray-50 text-base-content"
    >
      <div class="group-hover:hidden">
        {studio.hidden ? "🚫 Hidden" : ""}
      </div>
      <!-- <h2 class="hidden group-hover:block text-xl text-center font-bold">
        {name}
      </h2> -->

      <p
        class="hidden group-hover:block font-serif text-center overflow-hidden overflow-ellipsis mb-1"
      >
        {description}
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
</div>
