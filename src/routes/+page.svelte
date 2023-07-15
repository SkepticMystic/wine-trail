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
      title: "Contact",
      description: "Get in touch with us",
      href: "/contact",
    },
  ];
</script>

<Hero />

<ul class="flex flex-wrap gap-3 justify-center">
  {#each cards as { description, href, title }}
    <li
      class="p-4 border rounded-box bg-base-100 hover:scale-105 transition-all shadow"
    >
      <a {href} class="link link-primary font-semibold text-xl">
        {title}
      </a>
      <p>{description}</p>
    </li>
  {/each}
</ul>

<h2 id="#about" class="text-2xl mt-9 mb-2 text-center">About us</h2>
<div class="flex flex-col max-w-3xl mx-auto">
  <p>
    Yoga List is a website that helps you find yoga studios in your area. We
    have a large database of studios and teachers, and we are constantly adding
    more.
  </p>

  <p>
    We are a small team of yoga enthusiasts who want to make it easier for
    people to find yoga studios. We are based in Cape Town, South Africa. If you
    have any questions or suggestions, please feel free to <a
      href="/contact"
      class="link link-secondary">contact us</a
    >.
  </p>
</div>
