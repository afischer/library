<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import StructuralElement from './StructuralElement.svelte';
	import List from './List.svelte';

	export let document: docs_v1.Schema$Document;

	// Group consecutive list items together
	function groupContent(content: docs_v1.Schema$StructuralElement[]) {
		const grouped: Array<{
			type: 'list' | 'other';
			items: docs_v1.Schema$StructuralElement[];
		}> = [];

		let currentListGroup: docs_v1.Schema$StructuralElement[] | null = null;

		content.forEach((element) => {
			const isList = !!element.paragraph?.bullet;

			if (isList) {
				if (!currentListGroup) {
					currentListGroup = [];
				}
				currentListGroup.push(element);
			} else {
				if (currentListGroup) {
					grouped.push({ type: 'list', items: currentListGroup });
					currentListGroup = null;
				}
				grouped.push({ type: 'other', items: [element] });
			}
		});

		if (currentListGroup) {
			grouped.push({ type: 'list', items: currentListGroup });
		}

		return grouped;
	}

	$: groupedContent = groupContent(document.body?.content ?? []);
</script>

{#each groupedContent as group}
	{#if group.type === 'list'}
		<List
			items={group.items}
			listProperties={document.lists ?? {}}
			inlineObjects={document.inlineObjects ?? {}}
		/>
	{:else}
		{#each group.items as structuralElement}
			<StructuralElement
				{structuralElement}
				inlineObjects={document.inlineObjects ?? {}}
				listProperties={document.lists ?? {}}
			/>
		{/each}
	{/if}
{/each}
