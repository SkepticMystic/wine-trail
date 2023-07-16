<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "$lib/components/Loading.svelte";
  import TeacherEditor from "$lib/components/editors/TeacherEditor.svelte";
  import GoBack from "$lib/components/navigation/GoBack.svelte";
  import { teachers } from "$lib/stores/teachers";
  import { getProps } from "$lib/utils";

  let { loadObj } = getProps();

  let teacher = teachers.getBy({ slug: $page.params.teacher_slug });

  const patchTeacher = async () => {
    if (!teacher) return;

    loadObj["patch"] = true;

    await teachers.patch(teacher._id, teacher);

    loadObj["patch"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

{#if teacher}
  <div class="flex flex-col gap-3">
    <h1 class="text-3xl flex flex-wrap gap-5 items-center">
      <GoBack />
      <span>Edit {teacher.name}</span>
    </h1>

    <TeacherEditor bind:teacher />

    <div class="flex flex-wrap gap-3 mt-3">
      <GoBack colour="btn-neutral" />

      <button
        class="btn btn-primary grow"
        disabled={anyLoading}
        on:click={patchTeacher}
      >
        <Loading loading={loadObj["patch"]} />
        Save Changes
      </button>
    </div>
  </div>
{/if}
