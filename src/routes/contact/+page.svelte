<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import Label from "$lib/components/label.svelte";
  import type { Result } from "$lib/interfaces";
  import { addToast } from "$lib/stores/toast";
  import { getProps } from "$lib/utils";
  import { getHTTPErrorMsg } from "$lib/utils/errors";
  import axios from "axios";

  let { disabled, loadObj } = getProps();

  const request = {
    name: "",
    email: "",
    message: "",
  };

  const sendMessage = async () => {
    loadObj["send"] = true;
    try {
      const { data } = await axios.post<Result<undefined, unknown>>(
        "/api/contact",
        request
      );

      if (data.ok) {
        addToast({
          type: "success",
          message: "Message sent successfully",
        });

        disabled = true;
      } else {
        addToast({
          type: "error",
          message: "Message failed to send",
        });
      }
    } catch (error) {
      const message = getHTTPErrorMsg(error);
      addToast({
        type: "error",
        message,
      });
    }

    loadObj["send"] = false;
  };

  $: anyLoading = Object.values(loadObj).some((v) => v);
</script>

<div
  class="mx-auto flex flex-col gap-3 p-6 border rounded-box bg-base-100 w-fit"
>
  <h1 class="text-3xl text-center">Get in Touch</h1>

  <p class="max-w-xs text-center">
    If you have any questions or would like to get in touch, please fill out the
    form below.
  </p>

  <Label lbl="Name">
    <input
      type="text"
      class="input sm:w-80 w-full"
      autocomplete="name"
      placeholder="Name"
      bind:value={request.name}
    />
  </Label>

  <Label lbl="Email">
    <input
      type="text"
      class="input sm:w-80 w-full"
      autocomplete="email"
      placeholder="Email"
      bind:value={request.email}
    />
  </Label>

  <Label lbl="Message">
    <textarea
      class="textarea sm:w-80 h-80 w-full"
      placeholder="Message"
      bind:value={request.message}
    />
  </Label>

  <button
    class="btn btn-primary"
    disabled={disabled || anyLoading}
    on:click={sendMessage}
  >
    <Loading loading={loadObj["send"]} />
    Send
  </button>
</div>
