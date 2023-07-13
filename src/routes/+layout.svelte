<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
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
  <header>
    <Navbar />
  </header>

  <main class="my-8 max-w-screen-xl mx-auto px-4 md:px-8">
    <Loading {loading}>
      <slot />
    </Loading>
  </main>

  <Footer />
</Drawer>

<ToastList />
