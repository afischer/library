<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	import Category from '$lib/components/Category.svelte';

	export let data: { tree: FileTreeNode };
</script>

<h1>Categories</h1>

<section>
	{#each Object.values(data.tree.children) as node}
		<div class="category-card">
			<Category {node} />
		</div>
	{/each}
</section>

<style>
	.category-card {
		margin: 0 12px 30px 12px;
		padding: 25px;
		border: 1px solid #999999;
		box-shadow: -4px -4px 0px 0px #efefef;
		max-height: 450px;
		overflow-y: scroll;
	}

	section {
		padding-top: 1rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		padding: 1rem;
	}
</style>
