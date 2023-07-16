<script lang="ts">
  import { goto } from "$app/navigation";
  import Table from "$lib/components/table.svelte";
  import { studios } from "$lib/stores/studios.js";
  import { teachers } from "$lib/stores/teachers.js";

  export let data;

  const resourceList = data.resource_kind === "studio" ? $studios : $teachers;
  const resource_kind_id = data.resource_kind + "_id";

  const rows = resourceList.map((studio) => {
    const pendingInvites = data.pendingInvites
      .filter((invite) => invite.data?.[resource_kind_id] === studio._id)
      .map((invite) => "🕰️" + invite.identifier.split(":")[1])
      .join(", ");

    const acceptedInvites = data.users
      .filter((user) => user.studio_ids?.includes(studio._id))
      .map((user) => "✅" + user.email)
      .join(", ");

    return {
      studio_id: studio._id,
      name: studio.name,
      slug: studio.slug,
      acceptedInvites,
      pendingInvites,
    };
  });
</script>

<Table
  {rows}
  headers={["name", "acceptedInvites", "pendingInvites"]}
  preview={Infinity}
  onRowClick={(row) => goto(`/${data.resource_kind}s/${row.slug}`)}
/>
