<script lang="ts">
  export let openButtonText = "Open";
  export let openButtonClass = "";

  export let clickOutsideToClose = true;

  let modal: HTMLDialogElement;
</script>

<!-- Open the modal using ID.showModal() method -->
<button class="btn {openButtonClass}" on:click={() => modal.showModal()}>
  {openButtonText}
</button>

<!-- Modal goes bottom on mobile screen and goes middle on desktop -->
<dialog
  id="my_modal_1"
  class="modal modal-bottom sm:modal-middle"
  bind:this={modal}
>
  <form method="dialog" class="modal-box">
    <slot />

    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>

  {#if clickOutsideToClose}
    <!-- 'modal-backdrop' covers the screen so we can close the modal when clicked outside -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {/if}
</dialog>
