<script lang="ts">
	import List from './List.svelte';
	import type { docs_v1 } from 'googleapis';
	import TextRun from './TextRun.svelte';

	interface Props {
		items: docs_v1.Schema$StructuralElement[];
		listProperties: Record<string, docs_v1.Schema$List> | undefined;
		inlineObjects: Record<string, docs_v1.Schema$InlineObject>;
	}

	let { items, listProperties, inlineObjects }: Props = $props();

	interface ListItem {
		structuralElement: docs_v1.Schema$StructuralElement;
		nestingLevel: number;
		listId: string;
		nestStyle: docs_v1.Schema$NestingLevel | undefined;
		children: ListItem[];
	}

	// Process items to build a nested structure
	function buildListStructure(items: docs_v1.Schema$StructuralElement[]): ListItem[] {
		const result: ListItem[] = [];
		const stack: ListItem[] = [];

		items.forEach((structuralElement) => {
			const paragraph = structuralElement.paragraph;
			if (!paragraph?.bullet) return;

			const nestingLevel = paragraph.bullet.nestingLevel ?? 0;
			const listId = paragraph.bullet.listId ?? '';
			const list = listProperties?.[listId];
			const nestStyle = list?.listProperties?.nestingLevels?.[nestingLevel];

			const item: ListItem = {
				structuralElement,
				nestingLevel,
				listId,
				nestStyle,
				children: []
			};

			// Pop stack until we find the parent level
			while (stack.length > 0 && stack[stack.length - 1].nestingLevel >= nestingLevel) {
				stack.pop();
			}

			if (stack.length === 0) {
				result.push(item);
			} else {
				stack[stack.length - 1].children.push(item);
			}

			stack.push(item);
		});

		return result;
	}

	const listStructure = buildListStructure(items);

	function getListType(nestStyle: docs_v1.Schema$NestingLevel | undefined): 'ul' | 'ol' {
		const glyphType = nestStyle?.glyphType;
		if (!glyphType) return 'ul';

		// Ordered list types
		const orderedTypes = [
			'DECIMAL',
			'ZERO_DECIMAL',
			'UPPER_ALPHA',
			'ALPHA',
			'UPPER_ROMAN',
			'ROMAN'
		];

		return orderedTypes.includes(glyphType) ? 'ol' : 'ul';
	}

	function getListStyleType(nestStyle: docs_v1.Schema$NestingLevel | undefined): string {
		const glyphType = nestStyle?.glyphType;
		const glyphSymbol = nestStyle?.glyphSymbol;

		if (glyphSymbol) return `'${glyphSymbol} '`;

		switch (glyphType) {
			case 'DECIMAL':
				return 'decimal';
			case 'ZERO_DECIMAL':
				return 'decimal-leading-zero';
			case 'UPPER_ALPHA':
				return 'upper-alpha';
			case 'ALPHA':
				return 'lower-alpha';
			case 'UPPER_ROMAN':
				return 'upper-roman';
			case 'ROMAN':
				return 'lower-roman';
			case 'GLYPH_BULLET':
				return 'bullet';
			case 'HOLLOW_BULLET':
				return 'circle';
			case 'SQUARE_BULLET':
				return 'square';
			case 'GLYPH_TYPE_UNSPECIFIED':
				return `' '`;
			default:
				return 'none';
		}
	}

	// Group items by same nesting level for proper list rendering
	function renderList(
		items: ListItem[],
		defaultNestStyle?: docs_v1.Schema$NestingLevel | undefined
	) {
		// Get the style from the first item or use default
		const nestStyle = items[0]?.nestStyle ?? defaultNestStyle;
		const listType = getListType(nestStyle);
		const listStyleType = getListStyleType(nestStyle);

		return { items, listType, listStyleType };
	}

	let list = $derived(renderList(listStructure));
</script>

{#if list.listType === 'ul'}
	<ul style="list-style-type: {list.listStyleType};">
		{#each list.items as item}
			<li>
				{#each item.structuralElement.paragraph?.elements ?? [] as element}
					{#if element.textRun}
						<TextRun textRun={element.textRun} />
					{/if}
				{/each}
				{#if item.children.length > 0}
					<List
						items={item.children.map((c: ListItem) => c.structuralElement)}
						{listProperties}
						{inlineObjects}
					/>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<ol style="list-style-type: {list.listStyleType};">
		{#each list.items as item}
			<li>
				{#each item.structuralElement.paragraph?.elements ?? [] as element}
					{#if element.textRun}
						<TextRun textRun={element.textRun} />
					{/if}
				{/each}
				{#if item.children.length > 0}
					<List
						items={item.children.map((c: ListItem) => c.structuralElement)}
						{listProperties}
						{inlineObjects}
					/>
				{/if}
			</li>
		{/each}
	</ol>
{/if}
