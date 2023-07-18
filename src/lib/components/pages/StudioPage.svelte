<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { canModifyStudio } from "$lib/auth/permissions";
  import Loading from "$lib/components/Loading.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import StudioContact from "$lib/components/listings/ResourceContact.svelte";
  import StudioLinks from "$lib/components/listings/ResourceLinks.svelte";
  import StudioLocation from "$lib/components/listings/StudioLocation.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import Leaflet from "$lib/components/map/Leaflet.svelte";
  import { RESOURCE_EMOJI } from "$lib/const/resources";
  import type { SID } from "$lib/interfaces";
  import type { ModifyStudio } from "$lib/models/Studio";
  import { images } from "$lib/stores/images";
  import { studios } from "$lib/stores/studios";
  import { teachers } from "$lib/stores/teachers";
  import { getProps } from "$lib/utils";
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";
  import OtherImages from "../images/OtherImages.svelte";
  import ResourceMetaTags from "../listings/ResourceMetaTags.svelte";
  import StudioSchedule from "../listings/StudioSchedule.svelte";

  let { loadObj } = getProps();

  export let studio: SID<ModifyStudio> | undefined;
  export let reviewMode = false;

  const {
    logo: logoImages,
    other: otherImages,
    schedule: scheduleImages,
  } = images.getResourceImageUrls("studio", studio?._id);

  const studioTeachers = studio?._id
    ? $teachers.filter((teacher) => teacher.studio_ids?.includes(studio?._id!))
    : [];

  let inviteEmail = studio?.contact?.email;
  const inviteOwner = async () => {
    if (!studio?._id) return;

    loadObj["invite"] = true;

    const result = await studios.inviteOwner(studio._id, inviteEmail);

    loadObj["invite"] = false;
  };

  const deleteStudio = async () => {
    if (!studio?._id) return;

    loadObj["delete"] = true;

    const result = await studios.delete(studio._id);

    if (result.ok) {
      await goto("/studios");
    }

    loadObj["delete"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

<svelte:head>
  {#if studio}
    <ResourceMetaTags resource={studio} logoFileUrl={logoImages?.[0]} />
  {/if}
</svelte:head>

{#if studio}
  <div class="flex flex-col items-center">
    <h1
      class="text-3xl font-semibold text-center flex flex-wrap justify-center items-center gap-2"
    >
      {#if $page.data.user?.admin && studio._id}
        <button
          class="btn btn-ghost btn-square"
          disabled={anyLoading}
          title={studio._id}
          on:click={() =>
            studio?._id && navigator.clipboard.writeText(studio._id)}
        >
          ❔
        </button>
      {/if}

      <span>{studio.name}</span>

      {#if !reviewMode && studio?._id && canModifyStudio($page.data.user, studio._id)}
        <a href="{$page.url.pathname}/edit">
          <button class="btn btn-ghost btn-square" title="Edit Studio">
            ✏️
          </button>
        </a>
      {/if}

      {#if $page.data.user?.admin}
        <button
          class="btn btn-ghost btn-square"
          disabled={anyLoading}
          title="Delete Studio"
          on:click={deleteStudio}
        >
          <Loading loading={loadObj["delete"]}>🗑️</Loading>
        </button>

        {#if !reviewMode}
          <Modal
            btnCls="btn-ghost btn-square"
            btnText="📨"
            btnTitle="Invite new Owner"
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
                on:click={inviteOwner}
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
        class="self-start rounded-box w-[270px] h-[270px] sm:w-[400px] sm:h-[400px]"
        alt="{studio.name} logo"
      />

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          {#each studio.styles ?? [] as style}
            <YogaStyleBadge
              {style}
              title="View studios that offer {style} yoga"
              on:click={() => goto(`/studios?style=${style}`)}
            />
          {/each}
        </div>

        <p class="max-w-2xl text-base-content font-serif">
          {studio.description}
        </p>

        <div class="flex flex-wrap gap-3">
          {#if studio.links}
            <StudioLinks links={studio.links} />
          {/if}

          {#if studio.schedule}
            <StudioSchedule schedule={studio.schedule} />
          {/if}

          {#if studio.contact}
            <StudioContact contact={studio.contact} />
          {/if}
        </div>

        {#if studioTeachers.length}
          <div class="flex gap-2 flex-wrap items-center">
            <span class="text-lg" title="Teachers">
              {RESOURCE_EMOJI["teacher"]}
            </span>
            {#each studioTeachers as teacher, i}
              <a href="/teachers/{teacher.slug}" class="link link-secondary">
                {teacher.name}
              </a>{i === studioTeachers.length - 1 ? "" : ", "}
            {/each}
          </div>
        {/if}

        {#if studio.location}
          <StudioLocation location={studio.location} />
        {/if}
      </div>
    </div>

    {#if otherImages?.length}
      <OtherImages {otherImages} resource_name={studio.name} />
    {/if}
  </div>

  {#if studio.schedule.kind === "image"}
    {#if scheduleImages}
      <div class="flex flex-col gap-3 items-center my-5">
        <h2 class="text-2xl">Schedule</h2>
        <img
          class="md:w-[700px] sm:w-[500px] w-[300px] rounded-box"
          src={optimiseUploadJSImg(scheduleImages[0], {
            w: 700,
            crop: undefined,
            fit: "max",
          })}
          alt={studio.name + " schedule"}
        />
      </div>
    {/if}
  {/if}

  {#if studio.location.coordinates}
    <div class="block">
      <Leaflet {studio} />
    </div>
  {/if}
{:else}
  <p>Studio not found</p>
{/if}
