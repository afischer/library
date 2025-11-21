<script lang="ts">
	import type { docs_v1 } from 'googleapis';

	export let textRun: docs_v1.Schema$TextRun;
</script>

{#if textRun?.textStyle?.link}
	<a class={Object.keys(textRun?.textStyle ?? []).join(' ')} href={textRun?.textStyle?.link.url}>
		{textRun?.content}
	</a>
{:else}
	<span class={Object.keys(textRun?.textStyle ?? []).join(' ')}>
		{textRun?.content}
	</span>
{/if}

<!-- <pre>
  {JSON.stringify(paragraph, null, 2)}
  -------
</pre> -->

<style>
	.bold {
		font-weight: 800;
	}
	.italic {
		font-style: italic;
	}
	.underline {
		text-decoration: underline;
	}
</style>
