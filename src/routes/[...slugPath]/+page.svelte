<script lang="ts">
	import type { docs_v1, drive_v3 } from 'googleapis';

	import Document from '$lib/components/Document/index.svelte';
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode } from '$lib/types';
	import Avatar from '$lib/components/Avatar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	export let data: {
		doc: docs_v1.Schema$Document;
		revision: drive_v3.Schema$Revision;
		tree: FileTreeNode;
	};

	export const hydrate = false;
</script>

<header>
	<SearchBar />
	<h1>{data.tree.cleanName}</h1>
	{#if data.revision}
		<p>
			{#if data.revision.lastModifyingUser}
				<Avatar user={data.revision.lastModifyingUser} />
			{/if}
			Created {data.revision.lastModifyingUser?.displayName &&
				'by ' + data.revision.lastModifyingUser?.displayName}
			at {data.revision.modifiedTime}.
		</p>
		<p>
			{#if data.tree.file.lastModifyingUser}
				<Avatar user={data.tree.file.lastModifyingUser} />
				Last modified by {data.tree.file.lastModifyingUser?.displayName} at
				{data.tree.file.modifiedTime}.
			{:else}
				Last modified at {data.tree.file.modifiedTime}.
			{/if}
		</p>
	{/if}
</header>

<article>
	<Document document={data.doc} />
</article>

<aside>
	{#if Object.values(data.tree.children).length > 0}
		<div style="border: 1px solid black; padding: 1rem;">
			<h2>Pages in {data.tree.cleanName}</h2>
			<Category node={data.tree} />
		</div>
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
</style>
