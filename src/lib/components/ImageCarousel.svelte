<script lang="ts">
  export let images: string[];
</script>

<div class="carousel rounded-box">
  {#each images as src}
    <div class="carousel-item">
      <img width={300} {src} />
    </div>
  {/each}
</div>
