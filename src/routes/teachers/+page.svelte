<script lang="ts">
  import { page } from "$app/stores";
  import TeacherCard from "$lib/components/listings/TeacherCard.svelte";
  import { teachers } from "$lib/stores/teachers";
  import { addToast } from "$lib/stores/toast";

  addToast(
    {
      type: "info",
      message: `Welcome to Yoga List, and thanks for your interest! We're still building up our database at the moment.<br />
  But you can view and edit your teachers, in the mean time.`,
    },
    { clearQueue: true }
  );
</script>

<h1 class="text-center font-semibold text-3xl mb-5">
  <span>Yoga List Teachers</span>
  {#if $page.data.user?.admin}
    <a href="/teachers/create">
      <button class="btn btn-ghost btn-square" title="Create new Teacher">
        ➕
      </button>
    </a>
  {/if}
</h1>

<!-- TODO: Add TeacherFilters -->
<div
  class="my-5 flex flex-wrap gap-5 sm:gap-7 justify-center basic-card p-2 sm:p-6 w-fit"
>
  {#if $teachers.length}
    {#each $teachers as teacher, i (teacher.slug)}
      <TeacherCard {teacher} />
    {/each}
  {:else}
    <p class="text-center text-lg">
      No teachers found. Try removing some filters.
    </p>
  {/if}
</div>
