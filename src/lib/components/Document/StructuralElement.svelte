<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import Paragraph from './Paragraph.svelte';
	import Table from './Table.svelte';

	interface Props {
		structuralElement: docs_v1.Schema$StructuralElement;
		inlineObjects: Record<string, docs_v1.Schema$InlineObject>;
		listProperties: Record<string, docs_v1.Schema$List> | undefined;
	}

	let { structuralElement, inlineObjects, listProperties }: Props = $props();
</script>

{#if structuralElement.paragraph}
	<Paragraph paragraph={structuralElement.paragraph} {inlineObjects} {listProperties} />
{/if}
{#if structuralElement.table}
	<Table table={structuralElement.table} {inlineObjects} {listProperties} />
{/if}
