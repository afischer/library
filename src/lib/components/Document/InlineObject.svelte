<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import Image from './Image.svelte';

	export let inlineObject: docs_v1.Schema$InlineObject;
</script>

{#if inlineObject.inlineObjectProperties?.embeddedObject?.imageProperties}
	<Image imageProperties={inlineObject.inlineObjectProperties.embeddedObject.imageProperties} />
{:else}
	<pre>{JSON.stringify(inlineObject, null, 2)}</pre>
{/if}
