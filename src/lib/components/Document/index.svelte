<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import StructuralElement from './StructuralElement.svelte';

	export let document: docs_v1.Schema$Document;

	// console.log(JSON.stringify(document.lists, null, 2));
</script>

{#each document.body?.content ?? [] as structuralElement, i}
	<!-- NOTE: this will only work if you do NOT CSR as svelte can not parse dynamicly inserted html like this -->
	{@const lastEl = i === 0 ? null : document.body?.content?.[i - 1]}
	<!-- {#if (lastEl?.paragraph?.bullet && !structuralElement.paragraph?.bullet) || (lastEl?.paragraph?.bullet?.nestingLevel ?? 0) > (structuralElement?.paragraph?.bullet?.nestingLevel ?? 0)}
		{@html '</ul>'}
	{/if} -->
	{#if (!lastEl?.paragraph?.bullet && structuralElement.paragraph?.bullet) || (lastEl?.paragraph?.bullet?.nestingLevel ?? 0) < (structuralElement?.paragraph?.bullet?.nestingLevel ?? 0)}
		{@const list = document?.lists?.[structuralElement.paragraph?.bullet?.listId ?? '']}
		{@const nestStyle =
			list?.listProperties?.nestingLevels?.[structuralElement.paragraph?.bullet?.nestingLevel ?? 0]}
		<!-- {@html nestStyle?.glyphSymbol
			? `<ul style="list-style-type: '${nestStyle.glyphSymbol} ';"">`
			: `<ul>`} -->
	{/if}
	<StructuralElement
		{structuralElement}
		inlineObjects={document.inlineObjects ?? {}}
		listProperties={document.lists ?? {}}
	/>
{/each}
