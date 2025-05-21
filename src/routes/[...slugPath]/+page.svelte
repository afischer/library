<script lang="ts">
	import type { docs_v1, drive_v3 } from 'googleapis';

	import Document from '$lib/components/Document/index.svelte';
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode } from '$lib/types';
	import Avatar from '$lib/components/Avatar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Box from '$lib/components/Box.svelte';
	import ArticleHeader from '$lib/components/ArticleHeader.svelte';
	export let data: {
		doc: docs_v1.Schema$Document;
		revision: drive_v3.Schema$Revision;
		tree: FileTreeNode;
	};

	export const hydrate = false;
</script>

<header>
	<SearchBar />
	<ArticleHeader node={data.tree} revision={data.revision} />
</header>

<article>
	<Document document={data.doc} />
</article>

<aside>
	{#if Object.values(data.tree.children).length > 0}
		<Box>
			<h3>Pages in {data.tree.cleanName}</h3>
			<Category node={data.tree} />
		</Box>
	{/if}
</aside>

<style>
	article,
	aside,
	header {
		max-width: 600px;
		margin: 0 auto;
	}

	header {
		margin-top: 2rem;
	}

	h3 {
		margin: 0 0 10px;
		font-weight: 600;
	}
</style>
