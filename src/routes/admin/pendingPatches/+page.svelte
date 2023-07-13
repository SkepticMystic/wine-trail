<script lang="ts">
  import { goto } from "$app/navigation";
  import Table from "$lib/components/table.svelte";

  export let data;
</script>

<Table
  rows={data.pendingPatches}
  onRowClick={(pendingPatch) =>
    goto(`/admin/pendingPatches/${pendingPatch._id}`)}
/>
