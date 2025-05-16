<script lang="ts">
	import LogoLockup from '$lib/components/LogoLockup.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { FileTree } from '$lib/types';

	export let data: {
		tree: FileTree;
	};

	const featured = Object.values(data.tree.children).find((node) => node.tags.includes('featured'));
	const teams = Object.values(data.tree.children).filter((node) => node.tags.includes('team'));

	console.log(featured, teams);
</script>

<div class="hero">
	<LogoLockup size={38} />
	<p class="tagline">
		A collection of tools and tips for creating great journalism. <a href="/faq">Get started</a>.
	</p>

	<a href="/categories">view all files</a>
</div>

<div class="search-bar">
	<SearchBar />
</div>

<div class="teams">
	<h2>Teams</h2>
	{#each teams as team}
		<p><a href={`/${team.slug}`}>{team.cleanName}</a></p>
	{/each}

	<h2>Featured Articles</h2>
	{#each featured as article}
		<p>{article.cleanName}</p>
	{/each}
</div>

<style>
	div {
		color: var(--color-secondary-contrast);
		max-width: 600px;
		margin: 0 auto;
	}

	.hero {
		/* center the hero */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding-top: 10rem;
	}

	.tagline {
		font-size: 15px;
	}
</style>
