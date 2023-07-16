<script lang="ts">
  import Table from "$lib/components/table.svelte";
  import { studios } from "$lib/stores/studios.js";

  export let data;

  const rows = $studios.map((studio) => {
    const pendingInvites = data.pendingInvites
      .filter((invite) => invite.data?.studio_id === studio._id)
      .map((invite) => "🕰️" + invite.identifier.split(":")[1])
      .join(", ");

    const acceptedInvites = data.users
      .filter((user) => user.studio_ids?.includes(studio._id))
      .map((user) => "✅" + user.email)
      .join(", ");

    return {
      studio_id: studio._id,
      name: studio.name,
      acceptedInvites,
      pendingInvites,
    };
  });
</script>

<Table
  {rows}
  headers={["name", "acceptedInvites", "pendingInvites"]}
  preview={Infinity}
/>
