<script lang="ts">
  import type { SID } from "$lib/interfaces";
  import type { ModifyTeacher } from "$lib/models/Teachers";
  import StudioSelector from "../selectors/StudioSelector.svelte";
  import ResourceBasicEditor from "./ResourceBasicEditor.svelte";
  import ResourceContactEditor from "./ResourceContactEditor.svelte";
  import ResourceImagesEditor from "./ResourceImagesEditor.svelte";
  import ResourceLinksEditor from "./ResourceLinksEditor.svelte";
  import ResourceStylesEditor from "./ResourceStylesEditor.svelte";

  export let teacher: ModifyTeacher & Partial<SID<{}>>;
</script>

<div class="flex flex-col gap-5">
  <ResourceBasicEditor
    resource_kind="teacher"
    bind:name={teacher.name}
    bind:description={teacher.description}
    bind:hidden={teacher.hidden}
  />

  <ResourceStylesEditor resource_kind="teacher" bind:styles={teacher.styles} />

  <div class="basic-card">
    <h2 class="text-2xl">Studios</h2>

    <p class="text-base-content opacity-80 mt-1 my-3">
      Select the studios you teach at. If you are not the studio owner, we will
      first verify with them that you teach there. If you don't see your studio,
      please <a class="link link-secondary" href="/contact">reach out to us</a>.
    </p>

    <StudioSelector bind:studio_ids={teacher.studio_ids} />
  </div>

  <ResourceLinksEditor resource_kind="teacher" bind:links={teacher.links} />

  <ResourceContactEditor
    resource_kind="teacher"
    bind:contact={teacher.contact}
  />

  {#if teacher._id}
    <div class="basic-card">
      <h2 class="text-2xl">Images</h2>

      <p class="text-base-content opacity-80 mt-1 my-3">
        Upload some images of yourself. You can add a main image, as well as
        some other images showcasing your teaching.
      </p>

      <ResourceImagesEditor resource_id={teacher._id} resource_kind="teacher" />
    </div>
  {/if}
</div>
