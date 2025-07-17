<script lang="ts">
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode } from '$lib/types';
	import DocumentIcon from './icons/DocumentIcon.svelte';
	import FolderIcon from './icons/FolderIcon.svelte';
	import FolderOpenIcon from './icons/FolderOpenIcon.svelte';

	export let node: FileTreeNode;
	export let depth: number = 0;
	export let parentPath: string = '';
</script>

{#if Object.values(node.children).length > 0}
	<details open={depth === 0}>
		<summary>
			<ul>
				{#if node.file.mimeType === 'application/vnd.google-apps.folder'}
					{#if node.home}
						<!-- Folder with home -->
						<li><a href="{parentPath}/{node.home.slug}">{node.cleanName}</a></li>
					{:else}
						<!-- Folder with no home -->
						<li>{node.cleanName}</li>
					{/if}
				{:else}
					<!-- Individual file -->
					<li><a href="{parentPath}/{node.slug}">{node.cleanName}</a></li>
				{/if}
			</ul>
		</summary>
		{#each Object.values(node.children) as child}
			<Category node={child} depth={depth + 1} parentPath={parentPath + '/' + node.slug} />
		{/each}
	</details>
{:else}
	<li class="file"><a href="{parentPath}/{node.slug}">{node.cleanName}</a></li>
{/if}

<style>
	details > summary {
		list-style-type: none;
	}

	details > summary::-webkit-details-marker {
		display: none;
	}

	details > summary::before {
		content: url('/img/folder.svg');
	}

	details[open] > summary::before {
		content: url('/img/folder-open.svg');
	}

	ul {
		display: inline-block;
		margin: 0;
		padding: 0;
	}

	li {
		list-style-type: none;
		cursor: pointer;
		display: inline-flex;
		width: 100%;
	}

	li.file::before {
		content: url('/img/document.svg');
		/* margin-right: 0.5rem;
		margin-left: -6px; */
	}

	details {
		border-left: 1px solid #ccc;
		padding-left: 1rem;
		margin: 0;
	}
</style>
