<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	import Category from '$lib/components/Category.svelte';
	import Box from '$lib/components/Box.svelte';

	interface Props {
		data: { tree: FileTreeNode };
	}

	let { data }: Props = $props();
</script>

<h1>Categories</h1>

<section>
	{#each Object.values(data.tree.children) as node}
		<Box maxHeight={450}>
			<Category {node} />
		</Box>
	{/each}
</section>

<style>
	section {
		padding-top: 1rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		padding: 1rem;
	}
</style>
