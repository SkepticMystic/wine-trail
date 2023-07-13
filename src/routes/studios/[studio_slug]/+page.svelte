<script lang="ts">
  import { page } from "$app/stores";
  import StudioPage from "$lib/components/pages/StudioPage.svelte";
  import { studios } from "$lib/stores/studios";

  const { studio_slug } = $page.params;

  const studio = $studios.find((studio) => studio.slug === studio_slug);
</script>

<StudioPage {studio} />
