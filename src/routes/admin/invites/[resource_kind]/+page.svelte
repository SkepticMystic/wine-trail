<script lang="ts">
  import { goto } from "$app/navigation";
  import Table from "$lib/components/table.svelte";
  import { studios } from "$lib/stores/studios";
  import { teachers } from "$lib/stores/teachers";

  export let data;

  const resourceList =
    data.resource_kind === "studio"
      ? $studios
      : data.resource_kind === "teacher"
      ? $teachers
      : null;

  if (!resourceList) throw new Error("Invalid resource kind");

  const resource_kind_id = `${data.resource_kind}_id` as const;

  const rows = resourceList.map((resource) => {
    const pendingInvites = data.pendingInvites
      .filter((invite) => invite.data?.[resource_kind_id] === resource._id)
      .map((invite) => "🕰️" + invite.identifier.split(":")[1])
      .join(", ");

    const acceptedInvites = data.users
      .filter((user) => user[`${resource_kind_id}s`]?.includes(resource._id))
      .map((user) => "✅" + user.email)
      .join(", ");

    return {
      resource_id: resource._id,
      name: resource.name,
      slug: resource.slug,
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
