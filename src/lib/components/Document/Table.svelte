<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import StructuralElement from './StructuralElement.svelte';

	export let table: docs_v1.Schema$Table;
</script>

<table>
	{#each table.tableRows ?? [] as tableRow}
		<tr>
			{#each tableRow.tableCells ?? [] as tableCell}
				<td>
					{#each tableCell.content ?? [] as structuralElement}
						<StructuralElement {structuralElement} />
					{/each}
				</td>
			{/each}
		</tr>
	{/each}
</table>

<style>
	table {
		border-collapse: collapse;
	}

	td {
		border: 1px solid black;
	}
</style>
