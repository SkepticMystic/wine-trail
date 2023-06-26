<script lang="ts">
  export let images: string[];
</script>

<div class="carousel w-full max-w-sm">
  {#each images as src, i}
    {@const [prev, next] = [i - 1, i + 1]}
    <div id="slide{i}" class="carousel-item relative w-full">
      <img class="w-full" {src} />

      <div
        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
      >
        <a href="#slide{prev}">
          <button class="btn btn-circle" disabled={prev < 0}> ❮ </button>
        </a>

        <a href="#slide{next}">
          <button class="btn btn-circle" disabled={next >= images.length}>
            ❯
          </button>
        </a>
      </div>
    </div>
  {/each}
</div>
