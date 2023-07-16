<script lang="ts">
  import type { SID } from "$lib/interfaces";
  import type { Studio } from "$lib/models/Studio";
  import { images } from "$lib/stores/images";
  import ResourceCard from "./ResourceCard.svelte";

  export let studio: SID<Studio>;

  const { name, description, slug, styles, hidden } = studio;

  const studioImages = images.getResourceImages("studio", studio._id);
  const logo = studioImages.find((i) => i.image_kind === "logo")?.data.fileUrl;
</script>

<ResourceCard
  resource_kind="studio"
  {logo}
  {name}
  {description}
  {styles}
  {hidden}
  {slug}
/>
