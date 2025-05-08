<script lang="ts">
	import { page } from '$app/state';
	import type { Breadcrumb } from '$lib/types';
	import BookIcon from '$lib/components/icons/BookIcon.svelte';

	export let data: {
		breadcrumbs: Breadcrumb[];
	};

	export let children;

	const isHome = page.url.pathname === '/';
</script>

<header>
	<nav aria-label="Main navigation">
		<div class="nav-content">
			<h1>
				<a class="brand" href="/" aria-label="Home">
					<BookIcon size="24" aria-hidden="true" />
					<span class="brand-text">Library</span>
				</a>
			</h1>

			{#if data.breadcrumbs.length}
				<nav class="breadcrumbs" aria-label="Breadcrumb">
					<ol>
						{#each data.breadcrumbs as breadcrumb, i}
							<li>
								<a href={breadcrumb.path}>{breadcrumb.cleanName}</a>
							</li>
						{/each}
					</ol>
				</nav>
			{/if}
		</div>
	</nav>
</header>

<main class:bg-dark={isHome}>
	{@render children()}
</main>

<style>
	header {
		background-color: var(--color-secondary);
		color: var(--color-secondary-contrast);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	nav {
		height: 50px;
	}

	.nav-content {
		display: flex;
		align-items: center;
	}

	nav a {
		margin-left: 0.5rem;
		text-decoration: none;
		font-size: 15px;
		color: var(--color-secondary-contrast);
	}

	nav h1 {
		margin: 0;
		display: inline-block;
	}

	nav h1 a {
		font-size: 18px;
		display: flex;
		align-items: center;
	}

	.brand-text {
		padding-left: 0.5rem;
		border-left: 1px solid rgba(255, 255, 255, 0.35);
	}

	.breadcrumbs {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.breadcrumbs ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.breadcrumbs li {
		display: flex;
		align-items: center;
	}

	.breadcrumbs li::before {
		content: '→';
		margin-left: 0.5rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.bg-dark {
		background-color: var(--color-dark);
	}
</style>
