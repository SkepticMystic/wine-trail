<script lang="ts">
  import type { SID } from "$lib/interfaces";
  import type { Teacher } from "$lib/models/Teachers";
  import { images } from "$lib/stores/images";
  import ResourceCard from "./ResourceCard.svelte";

  export let teacher: SID<Teacher>;

  const { name, description, slug, styles, hidden } = teacher;

  const teacherImages = images.getResourceImages("teacher", teacher._id);
  const logo = teacherImages.find((i) => i.image_kind === "logo")?.data.fileUrl;
</script>

<ResourceCard
  resource_kind="teacher"
  {logo}
  {name}
  {description}
  {styles}
  {hidden}
  {slug}
/>
