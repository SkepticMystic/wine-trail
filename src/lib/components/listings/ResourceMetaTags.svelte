<script lang="ts">
  import { page } from "$app/stores";
  import type { ModifyStudio } from "$lib/models/Studio";
  import type { ModifyTeacher } from "$lib/models/Teachers";

  export let resource: ModifyStudio | ModifyTeacher;
  export let logoFileUrl: string | undefined;

  const title = `Yoga List ☯️ ${resource.name}`;
</script>

<title>{title}</title>
<meta property="og:title" content={title} />

<meta property="description" content={resource.description} />
<meta property="og:description" content={resource.description} />

<meta property="og:url" content={$page.url.href} />

{#if logoFileUrl}
    <meta property="og:image" content={logoFileUrl} />
{/if}
