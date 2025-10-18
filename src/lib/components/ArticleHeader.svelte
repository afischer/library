<script lang="ts">
	import type { FileTreeNode } from '$lib/types';
	import type { drive_v3 } from 'googleapis';

	export let node: FileTreeNode;
	export let revision: drive_v3.Schema$Revision;
</script>

<h1>{node?.cleanName}</h1>
<div class="author-info">
	{#if revision}
		<p>
			{#if revision.lastModifyingUser}
				Created {revision.lastModifyingUser?.displayName &&
					'by ' + revision.lastModifyingUser?.displayName}
				at {revision.modifiedTime}.
			{/if}
		</p>
		<p>
			{#if node.file.lastModifyingUser}
				Last modified by {node.file.lastModifyingUser?.displayName} at
				{node.file.modifiedTime}.
			{:else}
				Last modified at {node.file.modifiedTime}.
			{/if}
		</p>
	{/if}
</div>

<style>
	.author-info {
		border-bottom: 5px solid var(--color-gray);
		padding-bottom: 1rem;
		font-size: 13px;
	}
</style>
