<script lang="ts">
	import type { docs_v1 } from 'googleapis';

	interface Props {
		imageProperties: docs_v1.Schema$Schema$ImageProperties;
	}

	let { imageProperties }: Props = $props();
</script>

<figure>
	<img src={imageProperties?.contentUri} />
</figure>

<style>
	img {
		width: 100%;
	}
</style>
