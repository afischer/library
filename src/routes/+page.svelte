<script lang="ts">
	import type { FileTree } from '$lib/types';

	export let data: {
		tree: FileTree;
	};

	const featured = Object.values(data.tree.children).find((node) => node.tags.includes('featured'));
	const teams = Object.values(data.tree.children).filter((node) => node.tags.includes('team'));

	console.log(featured, teams);
</script>

<h1 class="brand">Library</h1>

<a href="/categories">view all files</a>

<form method="GET" action="/search">
	<input type="text" name="q" />
	<button type="submit">Search</button>
</form>

<h2>Teams</h2>
{#each teams as team}
	<p><a href={`/${team.slug}`}>{team.cleanName}</a></p>
{/each}

<h2>Featured Articles</h2>
{#each featured as article}
	<p>{article.cleanName}</p>
{/each}

<h1>NYT Library</h1>
