<script lang="ts">
  import Loading from "./Loading.svelte";

  export let loading = false;
  export let disabled = false;
  export let btnCls: string | undefined = undefined;
  export let btnText: string | undefined = undefined;
  export let btnTitle: string | undefined = undefined;

  export let clickOutsideToClose = true;

  let modal: HTMLDialogElement;
</script>

<!-- Open the modal using ID.showModal() method -->
<button
  {disabled}
  class="btn {btnCls ?? ''}"
  title={btnTitle}
  on:click={() => modal.showModal()}
>
  <Loading {loading} />
  {btnText}
</button>

<!-- Modal goes bottom on mobile screen and goes middle on desktop -->
<dialog
  id="my_modal_1"
  class="modal modal-bottom sm:modal-middle"
  bind:this={modal}
>
  <div class="modal-box">
    <slot name="content" />

    <!-- if there is a button in form, it will close the modal -->
    <form method="dialog" class="modal-action justify-between">
      <div>
        <slot name="action" />
      </div>
      <button class="btn-warning btn">Close</button>
    </form>
  </div>

  {#if clickOutsideToClose}
    <!-- 'modal-backdrop' covers the screen so we can close the modal when clicked outside -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {/if}
</dialog>
