<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let studio: Studio;

  const { name, description, logo, slug } = studio;
</script>

<div class="card card-compact w-80 bg-base-100 shadow-lg">
  <a href="/studios/{slug}">
    <img
      class="rounded-t-box aspect-square object-cover"
      src={logo}
      alt={name}
    />
  </a>

  <div class="card-body">
    <h2 class="card-title">{name}</h2>
    <p class="font-serif">
      {description.slice(0, 250)}{description.length > 250 ? "..." : ""}
    </p>
    <div class="card-actions justify-between">
      <p>🔥</p>
      <a href="/studios/{slug}">
        <button class="btn btn-sm btn-secondary"> View Studio </button>
      </a>
    </div>
  </div>
</div>
