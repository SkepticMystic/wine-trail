<script lang="ts">
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";

  export let otherImages: string[];
  export let resource_name: string;
</script>

<div class="flex flex-wrap justify-center gap-3 my-5">
  {#each otherImages as otherImage}
    <div class="overflow-hidden rounded-box">
      <img
        width={384}
        class="hover:scale-110 transition-all"
        src={optimiseUploadJSImg(otherImage, {
          w: 384,
          h: 384,
          crop: "smart",
        })}
        alt="{resource_name} image"
      />
    </div>
  {/each}
</div>
