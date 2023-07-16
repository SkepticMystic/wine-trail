<script lang="ts">
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/Loading.svelte";
  import TeacherEditor from "$lib/components/editors/TeacherEditor.svelte";
  import GoBack from "$lib/components/navigation/GoBack.svelte";
  import type { ModifyTeacher } from "$lib/models/Teachers";
  import { teachers } from "$lib/stores/teachers";
  import { getProps } from "$lib/utils";

  let { loadObj } = getProps();

  let teacher: ModifyTeacher = {
    hidden: true,

    name: "",
    description: "",

    styles: [],
    studio_ids: [],

    contact: {
      email: undefined,
      phone: undefined,
    },
    links: {
      facebook: undefined,
      instagram: undefined,
      website: undefined,
    },
  };

  const createTeacher = async () => {
    if (!teacher) return;

    loadObj["create"] = true;

    const result = await teachers.create(teacher);

    if (result.ok) {
      await goto(`/teachers/${result.data.teacher.slug}/edit`);
    }

    loadObj["create"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

{#if teacher}
  <div class="flex flex-col gap-3">
    <h1 class="font-semibold text-3xl">
      <GoBack />
      <span>Create new Teacher</span>
    </h1>

    <TeacherEditor bind:teacher />

    <button
      class="btn btn-primary"
      disabled={anyLoading}
      on:click={createTeacher}
    >
      <Loading loading={loadObj["create"]} />
      Create new teacher
    </button>
  </div>
{/if}
