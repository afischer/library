<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import LogoLockup from '$lib/components/LogoLockup.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { FileTree, FileTreeNode } from '$lib/types';

	interface Props {
		data: {
			tree: FileTree;
			titles: string[];
		};
	}

	let { data }: Props = $props();

	const getFeaturedNodes = (tree: FileTree): { url: string; name: string }[] => {
		const featuredNodes: { url: string; name: string }[] = [];

		const traverseTree = (node: FileTreeNode, parentPath = '') => {
			if (node.tags.includes('featured')) {
				featuredNodes.push({ url: `${parentPath}/${node.slug}`, name: node.cleanName });
			}
			Object.values(node.children).forEach((child) =>
				traverseTree(child, `${parentPath}/${node.slug}`)
			);
		};

		Object.values(tree.children).forEach((child) => traverseTree(child));

		return featuredNodes;
	};

	const featured = getFeaturedNodes(data.tree);
	const teams = Object.values(data.tree.children).filter((node) => node.tags.includes('team'));
</script>

<div class="hero">
	<LogoLockup size={38} />
	<p class="tagline">
		A collection of tools and tips for creating great journalism. <a href="/faq">Get started</a>.
	</p>

	<div class="search-bar">
		<SearchBar typeaheadValues={data.titles} />
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
				<li><a href={article.url}>{article.name}</a></li>
			{/each}
		</ul>

		<Button href="/categories">View All Docs</Button>
	</section>
</div>

<style>
	.hero,
	.home-content {
		color: var(--color-secondary);
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
		color: var(--color-secondary);
	}

	ul {
		margin: 0;
		padding: 0;
		line-height: 1.8;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	li {
		list-style-type: none;
		cursor: pointer;
		display: inline-flex;
		width: 100%;
	}

	li a {
		margin-top: -0.15rem;
		margin-left: 0.5rem;
		color: var(--color-secondary);
		text-decoration: none;
	}

	li::before {
		content: url('/img/document.svg');
		display: contents;
		margin-right: 0.5rem;
		margin-left: -6px;
	}

	.search-bar {
		width: 100%;
		margin-top: 1rem;
	}
</style>
