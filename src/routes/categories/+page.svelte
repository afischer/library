<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	import Category from '$lib/components/Category.svelte';

	export let data: { tree: FileTreeNode };
</script>

<article>
	{#each Object.values(data.tree.children) as node}
		<Category {node} />
	{/each}
</article>
