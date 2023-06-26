<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Drawer from "$lib/components/drawer/Drawer.svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import ToastList from "$lib/components/toastList.svelte";
  import "../app.css";
</script>

<Drawer>
  <header>
    <Navbar />
  </header>

  <main class="my-8 max-w-7xl mx-auto sm:px-4 md:px-8">
    <slot />
  </main>

  <Footer />
</Drawer>

<ToastList />
