<script lang="ts">
  import { page } from "$app/stores";
  import TeacherPage from "$lib/components/pages/TeacherPage.svelte";
  import { teachers } from "$lib/stores/teachers";

  const { teacher_slug } = $page.params;

  const teacher = $teachers.find((teacher) => teacher.slug === teacher_slug);
</script>

<TeacherPage {teacher} />
