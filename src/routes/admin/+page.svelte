<script>
  import { RESOURCE_KINDS } from "$lib/const/resources";
</script>

<h1 class="text-2xl font-semibold">Admin</h1>

<h2 class="text-xl mt-5 mb-3 font-semibold">Users</h2>
<ul class="list-inside list-disc my-3">
  <li>
    <a class="link link-primary" href="/admin/users">Users</a>
  </li>
</ul>

{#each RESOURCE_KINDS as resource_kind}
  <h2 class="text-xl mt-5 mb-3 font-semibold capitalize">{resource_kind}s</h2>
  <ul class="list-inside list-disc my-3">
    <li>
      <a class="link link-primary" href="/admin/invites/{resource_kind}">
        View invites
      </a>
    </li>
    <li>
      <a class="link link-primary capitalize" href="/{resource_kind}s/create">
        Create new {resource_kind}
      </a>
    </li>
    <li>
      <a
        class="link link-primary"
        href="/admin/pendingPatches?resource_kind={resource_kind}"
      >
        Pending Updates
      </a>
    </li>
  </ul>
{/each}
