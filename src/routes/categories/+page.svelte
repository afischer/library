<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	import Category from '$lib/components/Category.svelte';

	export let data: { tree: FileTreeNode };
</script>

<h1>Categories</h1>

<section>
	{#each Object.values(data.tree.children) as node}
		<Category {node} />
	{/each}
</section>
