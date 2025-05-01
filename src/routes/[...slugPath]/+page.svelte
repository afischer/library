<script lang="ts">
	import type { docs_v1 } from 'googleapis';

	import Document from '$lib/components/Document/index.svelte';

	export let data: {
		doc: docs_v1.Schema$Document;
	};

	export const hydrate = false;
</script>

<article>
	<Document document={data.doc} />
</article>
