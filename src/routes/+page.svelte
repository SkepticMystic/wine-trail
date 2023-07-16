<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";

  const cards: {
    title: string;
    description: string;
    href: string;
  }[] = [
    {
      title: "Studios",
      description: "View all studios",
      href: "/studios",
    },
    {
      title: "Teachers",
      description: "View all teachers",
      href: "/teachers",
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      href: "/contact",
    },
  ];
</script>

<Hero />

<ul class="flex flex-wrap gap-5 justify-center">
  {#each cards as { description, href, title }}
    <li
      class="p-6 border rounded-box bg-base-100 hover:scale-105 transition-all shadow"
    >
      <a {href} class="link link-primary font-semibold text-2xl">
        {title}
      </a>
      <p class="text-lg">{description}</p>
    </li>
  {/each}
</ul>
