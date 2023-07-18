<script lang="ts">
  import type { ResourceKind } from "$lib/const/resources";
  import type { YogaStyle } from "$lib/const/styles";
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";
  import YogaStyleBadge from "./YogaStyleBadge.svelte";

  export let resource_kind: ResourceKind;
  export let logo: string | undefined;
  export let name: string;
  export let description: string;
  export let slug: string;
  export let styles: YogaStyle[] | undefined;
  export let hidden: boolean | undefined;
</script>

<div class="flex flex-col gap-2">
  <h3 class="text-lg text-center font-semibold">{name}</h3>
  <a
    href="{resource_kind}s/{slug}"
    style="background-image: url({logo
      ? optimiseUploadJSImg(logo, { w: 300, h: 300 })
      : ''});"
    class="rounded-box w-[270px] sm:w-[300px] h-[270px] sm:h-[300px] shadow-lg group relative bg-cover bg-center border"
  >
    <div
      class="flex flex-col justify-between p-4 bg-opacity-10 bg-slate-400 absolute w-full h-full rounded-box hover:bg-opacity-90 hover:text-gray-50 text-base-content"
    >
      <div class="group-hover:hidden">
        {hidden ? "🚫 Hidden" : ""}
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
            title="Show {resource_kind}s that offer {style} yoga"
          />
        {/each}
      </div>
    </div>
  </a>
</div>
