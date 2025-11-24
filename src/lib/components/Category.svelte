<script lang="ts">
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode } from '$lib/types';

	interface Props {
		node: FileTreeNode;
		depth?: number;
		parentPath?: string;
	}

	let { node, depth = 0, parentPath = '' }: Props = $props();

	const hasChildren = Object.values(node.children).length > 0;
	const sortedChildren = Object.values(node.children).sort((a, b) => {
		const aIsFolder = Object.keys(a.children).length > 0;
		const bIsFolder = Object.keys(b.children).length > 0;

		if (aIsFolder && !bIsFolder) return -1;
		if (!aIsFolder && bIsFolder) return 1;

		return a.file.name?.localeCompare(b.file.name ?? '') ?? 0;
	});
</script>

{#if depth === 0 && hasChildren}
	<!-- Top-level: just render children without the folder wrapper -->
	{#each sortedChildren as child}
		<Category node={child} depth={depth + 1} {parentPath} />
	{/each}
{:else if hasChildren}
	<!-- Nested folders: render with details/summary -->
	<details open={depth === 1}>
		<summary>
			{#if node.home}
				<a href="{parentPath}/{node.home.slug}">{node.cleanName}</a>
			{:else}
				<a href="{parentPath}/{node.slug}">{node.cleanName}</a>
			{/if}
		</summary>
		<div class="children">
			{#each sortedChildren as child}
				<Category node={child} depth={depth + 1} parentPath="{parentPath}/{node.slug}" />
			{/each}
		</div>
	</details>
{:else}
	<!-- Leaf files -->
	<div class="file">
		<a href="{parentPath}/{node.slug}">{node.cleanName}</a>
	</div>
{/if}

<style>
	details {
		margin: 0;
	}

	summary {
		list-style-type: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::before {
		content: '';
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		background-image: url('/img/folder.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	details[open] > summary::before {
		background-image: url('/img/folder-open.svg');
	}

	.children {
		border-left: 1px solid #ccc;
		padding-left: 1rem;
		margin-left: 0.5rem;
	}

	.file {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
	}

	.file::before {
		content: '';
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		background-image: url('/img/document.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	span {
		color: #666;
	}
</style>
