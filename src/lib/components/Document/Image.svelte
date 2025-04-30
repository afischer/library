<script lang="ts">
	import type { docs_v1 } from 'googleapis';

	export let imageProperties: docs_v1.Schema$Schema$ImageProperties;
</script>

<figure>
	<img src={imageProperties?.contentUri} />
</figure>

<style>
	img {
		width: 100%;
	}
</style>
