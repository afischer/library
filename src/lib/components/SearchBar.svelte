<script lang="ts">
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import type { FileTreeNode } from '$lib/types';

	export let node: FileTreeNode;

	const flatTitles = Object.values(node?.children ?? {}).map((child) => child.cleanName);
</script>

<form method="GET" action="/search">
	<span>
		<input type="text" name="q" placeholder="What are you looking for?" />
		<button type="submit">
			<SearchIcon size={16} />
		</button>

		{#each flatTitles as title}
			<button
				type="button"
				on:click={() => {
					window.location.href = `/${title}`;
				}}
			>
				{title}
			</button>
		{/each}
	</span>
</form>
