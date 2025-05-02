<script lang="ts">
	import type { docs_v1, drive_v3 } from 'googleapis';

	import Document from '$lib/components/Document/index.svelte';
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode } from '$lib/types';

	export let data: {
		doc: docs_v1.Schema$Document;
		revision: drive_v3.Schema$Revision;
		tree: FileTreeNode;
	};

	export const hydrate = false;
</script>

{#if data.revision}
	{JSON.stringify(data.revision)}
	<h1>{data.tree.cleanName}</h1>
	<img
		src={data.revision.lastModifyingUser?.photoLink}
		alt="{data.revision.lastModifyingUser?.displayName} photo"
	/>
	<p>
		Created {data.revision.lastModifyingUser?.displayName &&
			'by ' + data.revision.lastModifyingUser?.displayName}
		at {data.revision.modifiedTime}.
	</p>
	<p>
		Last modified by {data.tree.file.lastModifyingUser?.displayName} at
		{data.tree.file.modifiedTime}.
	</p>
{/if}

<article>
	<Document document={data.doc} />
</article>

{#if Object.values(data.tree.children).length > 0}
	<div style="border: 1px solid black; padding: 1rem;">
		<h2>Pages in {data.tree.cleanName}</h2>
		<Category node={data.tree} />
	</div>
{/if}
