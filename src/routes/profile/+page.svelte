<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Loading from "$lib/components/Loading.svelte";
  import ResultText from "$lib/components/resultText.svelte";
  import type { Result } from "$lib/interfaces";
  import { studios } from "$lib/stores/studios";
  import { getProps } from "$lib/utils";
  import { getHTTPErrorMsg } from "$lib/utils/errors";
  import axios from "axios";
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

<h1 class="text-2xl my-3">Profile</h1>

<h2 class="text-xl mb-3">My Studios</h2>
<ul>
  {#each $page.data.user?.studio_ids ?? [] as studio_id}
    {@const studio = studios.getById(studio_id)}
    {#if studio}
      <li class="list-inside list-disc">
        <a href="/studios/{studio.slug}" class="link link-primary">
          {studio.name}
        </a>
      </li>
    {/if}
  {/each}
</ul>

{#if $page.data.user}
  <div class="my-5">
    <ChangePassword />
  </div>

  <div class="my-5">
    <button class="btn btn-error" disabled={loading} on:click={deleteUser}>
      <Loading {loading} />
      Delete Account
    </button>
  </div>

  <ResultText {err} />
{:else}
  <p class="text-lg">You are not logged in</p>
{/if}
