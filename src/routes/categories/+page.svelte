<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	import Category from '$lib/components/Category.svelte';
	// export const prerender = true;
	// export const ssr = true;
	// export const csr = false;

	export let data: {
		tree: FileTreeNode[];
	};
	// console.log(data);
	export const hydrate = false;
</script>

<article>
	{#each data.tree as node}
		<Category node={node} />
	{/each}
</article>
