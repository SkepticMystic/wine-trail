<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { canModifyStudio } from "$lib/auth/permissions";
  import Loading from "$lib/components/Loading.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import StudioContact from "$lib/components/listings/StudioContact.svelte";
  import StudioLinks from "$lib/components/listings/StudioLinks.svelte";
  import StudioLocation from "$lib/components/listings/StudioLocation.svelte";
  import YogaStyleBadge from "$lib/components/listings/YogaStyleBadge.svelte";
  import Leaflet from "$lib/components/map/Leaflet.svelte";
  import type { SID } from "$lib/interfaces";
  import type { ModifyStudio } from "$lib/models/Studio";
  import { images } from "$lib/stores/images";
  import { studios } from "$lib/stores/studios";
  import { getProps } from "$lib/utils";
  import { optimiseUploadJSImg } from "$lib/utils/UploadJS/optimisation";

  let { loadObj } = getProps();

  export let studio: SID<ModifyStudio> | undefined;
  export let reviewMode = false;

  const studioImages = studio?._id
    ? images.getResourceImages("studio", studio?._id)
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

{#if studio}
  {@const logo = studioImages.find((i) => i.image_kind === "logo")?.data
    .fileUrl}

  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-semibold text-center flex items-center gap-2">
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
        src={logo ? optimiseUploadJSImg(logo, { w: 400, h: 400 }) : ""}
        width={400}
        height={400}
        class="self-start rounded-box aspect-square"
        alt="{studio.name} logo"
      />

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          {#each studio.styles ?? [] as style}
            <YogaStyleBadge
              {style}
              title="View studios that offer {style} yoga"
              on:click={() => goto(`/?style=${style}`)}
            />
          {/each}
        </div>

        <p class="max-w-2xl text-base-content font-serif">
          {studio.description}
        </p>

        <div class="flex flex-wrap gap-3">
          {#if studio.links && studio.schedule}
            <StudioLinks links={studio.links} schedule={studio.schedule} />
          {/if}
          {#if studio.contact}
            <StudioContact contact={studio.contact} />
          {/if}
        </div>

        {#if studio.location}
          <StudioLocation location={studio.location} />
        {/if}
      </div>
    </div>

    <hr class="my-7" />

    <div class="flex flex-wrap justify-center gap-3 my-5">
      {#each studioImages.filter((i) => i.image_kind === "other") as img}
        <div class="overflow-hidden rounded-box">
          <img
            width={384}
            class="aspect-square object-cover hover:scale-110 transition-all"
            src={optimiseUploadJSImg(img.data.fileUrl, {
              w: 384,
              h: 384,
              crop: "smart",
            })}
            alt="{studio.name} image"
          />
        </div>
      {/each}
    </div>
  </div>

  {#if studio.location.coordinates}
    <div class="block">
      <Leaflet {studio} />
    </div>
  {/if}
{:else}
  <p>Studio not found</p>
{/if}
