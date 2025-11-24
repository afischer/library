<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	import Category from '$lib/components/Category.svelte';
	import Box from '$lib/components/Box.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	interface Props {
		data: { tree: FileTreeNode };
	}

	let { data }: Props = $props();
</script>

<section>
	<SearchBar typeaheadValues={[]} />
</section>
<section>
	{#each Object.values(data.tree.children) as node}
		<Box maxHeight={650}>
			<h2>{node.cleanName}</h2>
			<Category {node} parentPath={node.slug} />
		</Box>
	{/each}
</section>

<style>
	h2 {
		margin: 0 0 1rem;
	}

	section {
		padding-top: 1rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	@media (max-width: 1024px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		section {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
