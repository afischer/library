<script lang="ts">
	import type { docs_v1, drive_v3 } from 'googleapis';

	import Document from '$lib/components/Document/index.svelte';
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode, Heading } from '$lib/types';
	import Avatar from '$lib/components/Avatar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Box from '$lib/components/Box.svelte';
	import ArticleHeader from '$lib/components/ArticleHeader.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	export let data: {
		doc: docs_v1.Schema$Document | undefined;
		headings: Heading[] | undefined;
		revision: drive_v3.Schema$Revision;
		tree: FileTreeNode;
		titles: string[];
	};

	export const hydrate = false;
</script>

<header>
	<SearchBar typeaheadValues={data.titles} />
	<ArticleHeader node={data.tree} revision={data.revision} />
</header>

{#if data.headings}
	<nav class="toc">
		<TableOfContents headings={data.headings} />
	</nav>
{/if}

{#if data.doc}
	<article>
		<Document document={data.doc} />
	</article>
{/if}

<aside>
	{#if data?.tree?.children}
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
		padding-top: 5rem;
	}

	h3 {
		margin: 0 0 10px;
		font-weight: 600;
		font-size: 16px;
	}

	aside {
		margin-top: 2rem;
	}

	.toc {
		float: left;
		/* position: -webkit-sticky; */
		position: sticky;
		top: 100px;
		width: 220px;
		font-weight: 300;
		padding: 10px 20px;
		height: calc(100vh - 100px);
		overflow: scroll;
	}
</style>
