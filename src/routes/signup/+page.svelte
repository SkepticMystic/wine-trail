<script lang="ts">
  import { page } from "$app/stores";
  import { set_href } from "$lib/auth/client";
  import Loading from "$lib/components/Loading.svelte";
  import Label from "$lib/components/label.svelte";
  import ResultText from "$lib/components/resultText.svelte";
  import { getProps } from "$lib/utils";
  import { getActionErrorMsg } from "$lib/utils/errors";
  import type { ActionResult } from "@sveltejs/kit";
  import axios from "axios";

  const emailHint = $page.url.searchParams.get("email_hint");
  const studioInviteToken = $page.url.searchParams.get("studio_owner_token");

  let email: string | undefined = emailHint ?? undefined;
  let password: string;
  let { err, loading, suc } = getProps();

  const signup = async () => {
    (loading = true), (err = suc = "");

    try {
      const { data } = await axios.postForm<ActionResult>("", {
        email,
        password,
      });

      if (data.type === "redirect") {
        email = password = "";
        suc = "Sign up successful";
        set_href(data.location);
      } else err = "Something went wrong";
    } catch (error) {
      console.log(error);
      err = getActionErrorMsg(error);
    }
    loading = false;
  };

  $: if (email || password) err = "";
</script>

<div class="flex flex-col gap-3 items-center">
  {#if studioInviteToken}
    <p class="my-3 text-success">
      You've been invited to join a studio, please sign up to continue.
    </p>
  {/if}

  <h1 class="text-3xl mb-3">☯️ Yoga List</h1>

  <form on:submit|preventDefault={signup}>
    <Label lbl="Email">
      <input
        class="input w-72"
        type="email"
        autocomplete="email"
        disabled={!!emailHint}
        bind:value={email}
      />
    </Label>
    <Label lbl="Password">
      <input
        class="input w-72"
        type="password"
        autocomplete="new-password"
        bind:value={password}
      />
    </Label>

    <div class="flex justify-between items-center">
      <button
        class="my-4 btn btn-primary"
        type="submit"
        disabled={!email || !password || loading}
      >
        <Loading {loading} />
        Signup
      </button>

      <ResultText {err} />
    </div>
  </form>

  <p class="my-3">
    <a class="link" href="/signin">Sign in instead</a>
  </p>
</div>
