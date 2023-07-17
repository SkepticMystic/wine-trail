<script lang="ts">
  import { dev } from "$app/environment";
  import Footer from "$lib/components/Footer.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import ToastList from "$lib/components/toastList.svelte";
  import type { SID } from "$lib/interfaces";
  import type { Image } from "$lib/models/Images";
  import type { Studio } from "$lib/models/Studio";
  import type { Teacher } from "$lib/models/Teachers";
  import { images } from "$lib/stores/images";
  import { studios } from "$lib/stores/studios";
  import { teachers } from "$lib/stores/teachers";
  import { inject } from "@vercel/analytics";
  import axios from "axios";
  import { onMount } from "svelte";
  import "../app.css";

  inject({ mode: dev ? "development" : "production" });

  let loading = true;
  onMount(async () => {
    const { data } = await axios.get<{
      studios: SID<Studio>[];
      teachers: SID<Teacher>[];
      images: SID<Image>[];
    }>("/api/loadData");

    $studios = data.studios;
    $teachers = data.teachers;
    $images = data.images;

    loading = false;
  });
</script>

<div class="flex flex-col min-h-screen">
  <header>
    <Navbar />
  </header>

  <main class="my-8 max-w-screen-xl mx-auto px-4 md:px-8 flex-1">
    <Loading {loading}>
      <slot />
    </Loading>
  </main>

  <Footer />
</div>

<ToastList />
