<script lang="ts">
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/Loading.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Label from "$lib/components/label.svelte";
  import StudioPage from "$lib/components/pages/StudioPage.svelte";
  import TeacherPage from "$lib/components/pages/TeacherPage.svelte";
  import type { PendingPatchStatus } from "$lib/const/pendingPatches";
  import type { Result, SID } from "$lib/interfaces/index";
  import type { Studio } from "$lib/models/Studio";
  import type { Teacher } from "$lib/models/Teachers";
  import { studios } from "$lib/stores/studios";
  import { teachers } from "$lib/stores/teachers";
  import { addToast } from "$lib/stores/toast";
  import { getHTTPErrorMsg } from "$lib/utils/errors";
  import { getProps } from "$lib/utils/index";
  import {
    fillInStudioBlanks,
    fillInTeacherBlanks,
  } from "$lib/utils/resources/studios/index";
  import axios from "axios";

  // TODO: This does not generalise to other resource_kinds
  export let data;

  let { loadObj } = getProps<`submit:${PendingPatchStatus}`>();

  let reason: string;

  const submitModeration = async (status: PendingPatchStatus) => {
    if (!confirm(`Are you sure you want to make these changes as ${status}?`))
      return;

    loadObj[`submit:${status}`] = true;

    try {
      const response = await axios.patch<Result<SID<Studio | Teacher>, string>>(
        `/api/pendingPatches/${data.pendingPatch._id}`,
        { status, reason }
      );

      if (response.data.ok) {
        if (data.pendingPatch.resource_kind === "studio") {
          const newStudio = response.data.data as SID<Studio>;
          $studios = $studios.map((studio) =>
            studio._id === data.pendingPatch.resource_id
              ? fillInStudioBlanks(newStudio)
              : studio
          );
        } else if (data.pendingPatch.resource_kind === "teacher") {
          const newTeacher = response.data.data as SID<Teacher>;
          $teachers = $teachers.map((teacher) =>
            teacher._id === data.pendingPatch.resource_id
              ? fillInTeacherBlanks(newTeacher)
              : teacher
          );
        }

        addToast({
          type: "success",
          message: "Moderation submitted successfully",
        });

        await goto("/admin/pendingPatches");
      } else {
        addToast({
          type: "error",
          message: response.data.error,
        });
      }
    } catch (error) {
      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });

      console.error(error);
    }

    loadObj[`submit:${status}`] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

{#if data.pendingPatch.resource_kind === "studio"}
  <StudioPage reviewMode studio={data.pendingPatch.patch} />
{:else if data.pendingPatch.resource_kind === "teacher"}
  <TeacherPage reviewMode teacher={data.pendingPatch.patch} />
{:else}
  <p class="text-error">
    Unhandled resource kind: {data.pendingPatch.resource_kind}
  </p>
{/if}

<div class="flex justify-between my-5">
  <button
    class="btn btn-success"
    disabled={anyLoading}
    on:click={() => submitModeration("approved")}
  >
    <Loading loading={loadObj["submit:approved"]} />
    Approve Changes
  </button>

  <Modal btnCls="btn-error" btnText="Reject Changes">
    <div slot="content">
      <Label lbl="Rejection Reason">
        <textarea class="textarea" cols="50" rows="8" bind:value={reason} />
      </Label>
    </div>

    <div slot="action">
      <button
        class="btn btn-error"
        disabled={anyLoading}
        on:click={() => submitModeration("rejected")}
      >
        <Loading loading={loadObj["submit:rejected"]} />
        Submit Rejection
      </button>
    </div>
  </Modal>
</div>
