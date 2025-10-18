<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';
	import LogoLockup from '$lib/components/LogoLockup.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { FileTree, FileTreeNode } from '$lib/types';

	export let data: {
		tree: FileTree;
	};

	const getFeaturedNodes = (tree: FileTree): FileTreeNode[] => {
		const featuredNodes: FileTreeNode[] = [];

		const traverseTree = (node: FileTreeNode) => {
			if (node.tags.includes('featured')) {
				featuredNodes.push(node);
			}
			Object.values(node.children).forEach(traverseTree);
		};

		Object.values(tree.children).forEach(traverseTree);

		return featuredNodes;
	};

	const featured = getFeaturedNodes(data.tree);
	const teams = Object.values(data.tree.children).filter((node) => node.tags.includes('team'));

	console.log(featured, teams);
</script>

<div class="hero">
	<LogoLockup size={38} />
	<p class="tagline">
		A collection of tools and tips for creating great journalism. <a href="/faq">Get started</a>.
	</p>

	<a href="/categories">view all files</a>
	<div class="search-bar">
		<SearchBar tree={data.tree} />
	</div>
</div>

<div class="home-content">
	<section class="teams-section">
		<h2>Teams</h2>
		<div class="chips">
			{#each teams as team}
				<Chip href={`/${team.slug}`}>{team.cleanName}</Chip>
			{/each}
		</div>
	</section>

	<section class="featured-section">
		<h2>Useful Docs</h2>
		<ul class="articles">
			{#each featured as article}
				<li><a href={`/${article.slug}`}>{article.cleanName}</a></li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.hero,
	.home-content {
		color: var(--color-secondary-contrast);
		max-width: 600px;
		margin: 0 auto;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 10rem;
	}

	.tagline {
		font-size: 15px;
	}

	.home-content {
		margin: 4rem auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		font-size: 15px;
	}

	h2 {
		font-size: 15px;
		margin-bottom: 15px;
		color: var(--color-secondary-contrast);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	/* @media (max-width: 768px) {
		.home-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	} */

	li {
		list-style-type: none;
		cursor: pointer;
		display: inline-flex;
		width: 100%;
	}

	li.file::before {
		content: url('/img/document.svg');
		margin-right: 0.5rem;
		margin-left: -6px;
	}

	.search-bar {
		width: 100%;
		margin-top: 1rem;
	}
</style>
