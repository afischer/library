<script lang="ts">
	import { page } from '$app/state';
	import type { Breadcrumb } from '$lib/types';
	import LogoLockup from '$lib/components/LogoLockup.svelte';

	export let breadcrumbs: Breadcrumb[];

	const isHome = page.url.pathname === '/';
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	{#if breadcrumbs.length}
		<ol>
			<li>
				<LogoLockup />
			</li>
			{#each breadcrumbs as breadcrumb, i}
				<li>
					<a href={breadcrumb.path}>{breadcrumb.cleanName}</a>
				</li>
			{/each}
		</ol>
	{/if}
</nav>

<style>
	nav a {
		margin-left: 0.5rem;
		text-decoration: none;
		font-size: 15px;
		color: var(--color-secondary-contrast);
	}

	.breadcrumbs {
		flex: 1;
		color: var(--color-secondary-contrast);
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

	.breadcrumbs li:not(:last-child)::after {
		content: '→';
		margin-left: 0.5rem;
		color: rgba(255, 255, 255, 0.5);
	}
</style>
