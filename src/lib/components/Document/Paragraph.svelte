<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import TextRun from './TextRun.svelte';
	import InlineObject from './InlineObject.svelte';
	import Person from './Person.svelte';

	interface Props {
		paragraph: docs_v1.Schema$Paragraph;
		inlineObjects: Record<string, docs_v1.Schema$InlineObject>;
		listProperties: Record<string, docs_v1.Schema$List> | undefined; // if (paragraph.bullet) {
	}

	let { paragraph, inlineObjects, listProperties }: Props = $props();

	// 	console.log(JSON.stringify(paragraph, null, 2));
	// }
	// const list = listProperties[paragraph.paragraphStyle.namedStyleType];
</script>

<!-- size down each header since H1 is reserved for the title -->
<!-- {JSON.stringify(inlineObjects)} -->
{#if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_1'}
	<h2 id={paragraph?.paragraphStyle?.headingId}>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element.textRun} />
			{/if}
		{/each}
	</h2>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_2'}
	<h3 id={paragraph?.paragraphStyle?.headingId}>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h3>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_3'}
	<h4 id={paragraph?.paragraphStyle?.headingId}>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h4>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_4'}
	<h5 id={paragraph?.paragraphStyle?.headingId}>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h5>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_5'}
	<h6 id={paragraph?.paragraphStyle?.headingId}>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h6>
{:else if paragraph.bullet && listProperties}
	<!-- List items are now handled by the List component -->
{:else}
	<p>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{:else if element.inlineObjectElement && element.inlineObjectElement.inlineObjectId}
				<!-- TODO: this is broken when there are images in tables. -->
				<InlineObject inlineObject={inlineObjects[element.inlineObjectElement.inlineObjectId]} />
			{:else if element?.horizontalRule}
				<hr />
			{:else if element?.person}
				<Person person={element.person} />
			{:else}
				<span class="library-error">
					LIBRARY ERROR: Unknown element type <code>{JSON.stringify(element, null, 2)}</code>
				</span>
			{/if}
		{/each}
	</p>
{/if}

<style>
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 0.8rem;
	}
</style>
