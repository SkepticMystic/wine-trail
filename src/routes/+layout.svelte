<script lang="ts">
  import Drawer from "$lib/components/drawer/Drawer.svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import ToastList from "$lib/components/toastList.svelte";
  import "../app.css";
</script>

<Drawer>
  <header>
    <Navbar />
  </header>

  <main class="my-4 max-w-7xl mx-auto">
    <slot />
  </main>
</Drawer>

<ToastList />
