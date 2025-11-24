<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import StructuralElement from './StructuralElement.svelte';

	interface Props {
		table: docs_v1.Schema$Table;
		inlineObjects: Record<string, docs_v1.Schema$InlineObject>;
		listProperties: Record<string, docs_v1.Schema$List> | undefined;
	}

	let { table, inlineObjects, listProperties }: Props = $props();
</script>

<table>
	<tbody>
		{#each table.tableRows ?? [] as tableRow}
			<tr>
				{#each tableRow.tableCells ?? [] as tableCell}
					<td>
						{#each tableCell.content ?? [] as structuralElement}
							<StructuralElement {structuralElement} {inlineObjects} {listProperties} />
						{/each}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		word-break: keep-all;
		width: 100%;
	}

	td {
		border: 1px solid black;
	}
</style>
