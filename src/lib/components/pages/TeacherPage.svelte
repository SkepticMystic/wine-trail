<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { canModifyResource } from "$lib/auth/permissions";
  import Loading from "$lib/components/Loading.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ResourceContact from "$lib/components/listings/ResourceContact.svelte";
  import ResourceLinks from "$lib/components/listings/ResourceLinks.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import { RESOURCE_EMOJI } from "$lib/const/resources";
  import type { SID } from "$lib/interfaces";
  import type { Studio } from "$lib/models/Studio";
  import type { ModifyTeacher } from "$lib/models/Teachers";
  import { images } from "$lib/stores/images";
  import { studios } from "$lib/stores/studios";
  import { teachers } from "$lib/stores/teachers";
  import { getProps } from "$lib/utils";
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";
  import OtherImages from "../images/OtherImages.svelte";
  import ResourceMetaTags from "../listings/ResourceMetaTags.svelte";

  export let teacher: SID<ModifyTeacher> | undefined;
  export let reviewMode = false;

  let { loadObj } = getProps();

  const { logo: logoImages, other: otherImages } = images.getResourceImageUrls(
    "teacher",
    teacher?._id
  );

  const teacherStudios =
    (teacher?.studio_ids
      ?.map(studios.getById)
      .filter((s) => s) as SID<Studio>[]) ?? [];

  let inviteEmail = teacher?.contact?.email;
  const invite = async () => {
    if (!teacher?._id) return;

    loadObj["invite"] = true;

    const result = await teachers.invite(teacher._id, inviteEmail);

    loadObj["invite"] = false;
  };

  const deleteTeacher = async () => {
    if (!teacher?._id) return;

    loadObj["delete"] = true;

    const result = await teachers.delete(teacher._id);

    if (result.ok) {
      await goto("/teachers");
    }

    loadObj["delete"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

<svelte:head>
  {#if teacher}
    <ResourceMetaTags resource={teacher} logoFileUrl={logoImages?.[0]} />
  {/if}
</svelte:head>

{#if teacher}
  <div class="flex flex-col items-center">
    <!-- TODO: This header row can be a resource-wide component -->
    <h1
      class="text-3xl font-semibold text-center flex flex-wrap justify-center items-center gap-2"
    >
      {#if $page.data.user?.admin && teacher._id}
        <button
          class="btn btn-ghost btn-square"
          disabled={anyLoading}
          title={teacher._id}
          on:click={() =>
            teacher?._id && navigator.clipboard.writeText(teacher._id)}
        >
          ❔
        </button>
      {/if}

      <span>{teacher.name}</span>

      {#if !reviewMode && teacher?._id && canModifyResource($page.data.user, "teacher", teacher._id)}
        <a href="{$page.url.pathname}/edit">
          <button class="btn btn-ghost btn-square" title="Edit Teacher">
            ✏️
          </button>
        </a>
      {/if}

      {#if $page.data.user?.admin}
        <button
          class="btn btn-ghost btn-square"
          disabled={anyLoading}
          title="Delete Teacher"
          on:click={deleteTeacher}
        >
          <Loading loading={loadObj["delete"]}>🗑️</Loading>
        </button>

        {#if !reviewMode}
          <Modal
            btnCls="btn-ghost btn-square"
            btnText="📨"
            btnTitle="Invite Teacher"
          >
            <div slot="content">
              <input
                type="email"
                class="input w-72"
                placeholder="Email Address"
                bind:value={inviteEmail}
              />
            </div>

            <div slot="action">
              <button
                class="btn btn-primary"
                disabled={anyLoading}
                on:click={invite}
              >
                <Loading loading={loadObj["invite"]}>Invite</Loading>
              </button>
            </div>
          </Modal>
        {/if}
      {/if}
    </h1>

    <div class="flex flex-wrap gap-7 my-7 justify-center">
      <img
        src={logoImages
          ? optimiseUploadJSImg(logoImages[0], { w: 400, h: 400 })
          : ""}
        width={400}
        height={400}
        class="self-start rounded-box w-[250px] h-[250px] sm:w-[400px] sm:h-[400px]"
        alt="{teacher.name} logo"
      />

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          {#each teacher.styles ?? [] as style}
            <YogaStyleBadge
              {style}
              title="View teachers that offer {style} yoga"
              on:click={() => goto(`/teachers?style=${style}`)}
            />
          {/each}
        </div>

        <p class="max-w-2xl text-base-content font-serif">
          {teacher.description}
        </p>

        <div class="flex flex-wrap gap-3">
          {#if teacher.links}
            <ResourceLinks links={teacher.links} />
          {/if}
          {#if teacher.contact}
            <ResourceContact contact={teacher.contact} />
          {/if}
        </div>

        {#if teacherStudios.length}
          <div class="flex gap-2 flex-wrap items-center">
            <span class="text-lg" title="Teachers">
              {RESOURCE_EMOJI["studio"]}
            </span>
            {#each teacherStudios as studio, i}
              <a href="/studios/{studio.slug}" class="link link-secondary">
                {studio.name}
              </a>{i === teacherStudios.length - 1 ? "" : ", "}
            {/each}
          </div>
        {/if}
      </div>
    </div>

    {#if otherImages?.length}
      <OtherImages {otherImages} resource_name={teacher.name} />
    {/if}
  </div>
{:else}
  <p>Teacher not found</p>
{/if}
