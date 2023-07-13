<script lang="ts">
  import { studios } from "$lib/stores/studios";
  import type { User } from "lucia";

  export let studio_ids: User["studio_ids"];
</script>

<ul>
  {#each studio_ids ?? [] as studio_id}
    {@const studio = studios.getById(studio_id)}
    {#if studio}
      <li class="list-inside list-disc">
        <a href="/studios/{studio.slug}" class="link link-primary">
          {studio.name}
        </a>
      </li>
    {/if}
  {/each}
</ul>
