<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Loading from "$lib/components/Loading.svelte";
  import ResultText from "$lib/components/resultText.svelte";
  import type { Result } from "$lib/interfaces";
  import { getProps } from "$lib/utils";
  import { getHTTPErrorMsg } from "$lib/utils/errors";
  import axios from "axios";
  import MyStudios from "./MyStudios.svelte";
  import ChangePassword from "./changePassword.svelte";

  let { err, loading } = getProps();

  const deleteUser = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    (loading = true), (err = "");

    try {
      const { data } = await axios.delete<Result>("/api/user");
      if (data.ok) await goto("/signin");
    } catch (error) {
      console.log(error);
      err = getHTTPErrorMsg(error);
    }

    loading = false;
  };
</script>

<h1 class="text-2xl mb-5">Profile</h1>

<div class="my-7">
  <h2 class="text-xl mb-3">My Studios</h2>
  <MyStudios studio_ids={$page.data.user?.studio_ids} />
</div>

{#if $page.data.user}
  <div class="my-7">
    <ChangePassword />
  </div>

  <div class="my-7">
    <button class="btn btn-error" disabled={loading} on:click={deleteUser}>
      <Loading {loading} />
      Delete Account
    </button>
  </div>

  <ResultText {err} />
{:else}
  <p class="text-lg">You are not logged in</p>
{/if}
