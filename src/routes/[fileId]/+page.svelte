<script lang="ts">
	import type { docs_v1 } from 'googleapis';

	import Document from '$lib/components/Document/index.svelte';
	// export const prerender = true;
	// export const ssr = true;
	// export const csr = false;

	export let data: {
		doc: docs_v1.Schema$Document;
	};
	// console.log(data);
	export const hydrate = false;
</script>

<article>
	<h1>{data.doc.title}</h1>

	<Document document={data.doc} />
</article>
