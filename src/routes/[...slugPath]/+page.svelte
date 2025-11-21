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
	import Button from '$lib/components/Button.svelte';
	export let data: {
		doc: docs_v1.Schema$Document | undefined;
		headings: Heading[] | undefined;
		revision: drive_v3.Schema$Revision;
		tree: FileTreeNode;
		titles: string[];
	};

	export const hydrate = false;

	const firstParagraph = data.doc?.body?.content?.find((element) => !!element.paragraph);
</script>

<header>
	<SearchBar typeaheadValues={data.titles} />
	<ArticleHeader
		node={data.tree.home ?? data.tree}
		revision={data.tree.home?.revision ?? data.revision}
		firstElement={firstParagraph}
	/>
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

<aside class="footer">
	{#if data?.tree?.children}
		<Box>
			<h3>Pages in {data.tree.cleanName}</h3>
			<Category node={data.tree} />
		</Box>
	{/if}

	<hr class="separator" />
	<Button href={`https://docs.google.com/document/d/${data.doc?.documentId}/edit`}
		>Edit This Page</Button
	>
	{#if data.tree?.file?.parents?.length}
		<Button href="https://drive.google.com/drive/u/0/folders/{data.tree.file.parents[0]}"
			>View Folder</Button
		>
	{/if}

	<p>
		<small
			>For help contributing or to report a problem, email <a href="mailto:library@nytimes.com"
				>library@nytimes.com</a
			>
			or leave a message in the <a href="https://nytnews.slack.com/messages/library">#library</a> slack
			channel.</small
		>
	</p>
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

	.separator {
		border-top: 1px solid var(--color-secondary-contrast);
		margin-top: 8rem;
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

	@media (max-width: 1040px) {
		.toc {
			display: none;
		}
	}

	.footer {
		font-size: 0.9rem;
		margin: 5rem auto;
	}

	p small {
		line-height: 0.8;
	}
</style>
