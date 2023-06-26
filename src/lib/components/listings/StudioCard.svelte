<script lang="ts">
  import type { Studio } from "$lib/models/Studio";

  export let studio: Studio;

  const { name, description, logo, slug } = studio;
</script>

<div class="card card-compact w-72 bg-base-100 shadow-lg">
  <img class="rounded-t-box" src={logo} alt={name} />

  <div class="card-body">
    <h2 class="card-title">{name}</h2>
    <p>{description.slice(0, 250)}{description.length > 250 ? "..." : ""}</p>
    <div class="card-actions justify-between">
      <p>🔥</p>
      <a href="/studios/{slug}">
        <button class="btn btn-sm btn-secondary"> View Studio </button>
      </a>
    </div>
  </div>
</div>
