<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { FileTree } from '$lib/types';

	export let data: {
		tree: FileTree;
	};

	const featured = Object.values(data.tree.children).find((node) => node.tags.includes('featured'));
	const teams = Object.values(data.tree.children).filter((node) => node.tags.includes('team'));

	console.log(featured, teams);
</script>

<h1 class="brand">Library</h1>
<p>A collection of tools and tips for creating great journalism. Get started.</p>

<a href="/categories">view all files</a>

<SearchBar />

<h2>Teams</h2>
{#each teams as team}
	<p><a href={`/${team.slug}`}>{team.cleanName}</a></p>
{/each}

<h2>Featured Articles</h2>
{#each featured as article}
	<p>{article.cleanName}</p>
{/each}

<h1>NYT Library</h1>
