<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import Paragraph from './Paragraph.svelte';
	import Table from './Table.svelte';

	export let structuralElement: docs_v1.Schema$StructuralElement;
	export let inlineObjects: Record<string, docs_v1.Schema$InlineObject>;
	export let listProperties: Record<string, docs_v1.Schema$List> | undefined;
</script>

{#if structuralElement.paragraph}
	<Paragraph paragraph={structuralElement.paragraph} {inlineObjects} {listProperties} />
{/if}
{#if structuralElement.table}
	<Table table={structuralElement.table} {inlineObjects} {listProperties} />
{/if}
