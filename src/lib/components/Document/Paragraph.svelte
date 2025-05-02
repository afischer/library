<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import TextRun from './TextRun.svelte';
	import InlineObject from './InlineObject.svelte';

	export let paragraph: docs_v1.Schema$Paragraph;
	export let inlineObjects: Record<string, docs_v1.Schema$InlineObject>;
	export let listProperties: Record<string, docs_v1.Schema$ListProperties> | undefined;
	// if (paragraph.bullet) {
	// 	console.log(JSON.stringify(paragraph, null, 2));
	// }
	// const list = listProperties[paragraph.paragraphStyle.namedStyleType];
</script>

<!-- size down each header since H1 is reserved for the title -->
<!-- {JSON.stringify(inlineObjects)} -->
{#if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_1'}
	<h2>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element.textRun} />
			{/if}
		{/each}
	</h2>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_2'}
	<h3>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h3>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_3'}
	<h4>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h4>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_4'}
	<h5>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h5>
{:else if paragraph?.paragraphStyle?.namedStyleType === 'HEADING_5'}
	<h6>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</h6>
{:else if paragraph.bullet && listProperties}
	<!-- this is a nightmare fix this -->
	<!-- <code>{JSON.stringify(nestStyle)}</code> ----- -->
	<!-- <code>{JSON.stringify(paragraph.bullet)}</code> -->
	<li>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{/if}
		{/each}
	</li>
{:else}
	<p>
		{#each paragraph.elements ?? [] as element}
			{#if element.textRun}
				<TextRun textRun={element?.textRun} />
			{:else if element.inlineObjectElement && element.inlineObjectElement.inlineObjectId}
				<!-- TODO: this is broken when there are images in tables. -->
				<InlineObject inlineObject={inlineObjects[element.inlineObjectElement.inlineObjectId]} />
			{:else}
				unknown {element}
			{/if}
		{/each}
	</p>
{/if}

<!-- <pre>
  {JSON.stringify(paragraph, null, 2)}
  -------
</pre> -->

<style>
	/* .bold {
		font-weight: 800;
	}
	.italic {
		font-style: italic;
	}
	.underline {
		text-decoration: underline;
	} */
</style>
