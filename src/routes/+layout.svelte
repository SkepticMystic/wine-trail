<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import Drawer from "$lib/components/drawer/Drawer.svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import ToastList from "$lib/components/toastList.svelte";
  import type { SID } from "$lib/interfaces";
  import type { Image } from "$lib/models/Images";
  import type { Studio } from "$lib/models/Studio";
  import { images } from "$lib/stores/images";
  import { studios } from "$lib/stores/studios";
  import axios from "axios";
  import { onMount } from "svelte";
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });

  let loading = true;
  onMount(async () => {
    const { data } = await axios.get<{
      studios: SID<Studio>[];
      images: SID<Image>[];
    }>("/api/loadData");

    $studios = data.studios;
    $images = data.images;

    loading = false;
  });
</script>

<Drawer>
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
</Drawer>

<ToastList />
