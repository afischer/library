<script lang="ts">
	import { page } from '$app/state';
	import type { Breadcrumb } from '$lib/types';
	import LogoLockup from '$lib/components/LogoLockup.svelte';

	interface Props {
		breadcrumbs: Breadcrumb[];
	}

	let { breadcrumbs }: Props = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	{#if breadcrumbs.length}
		<ol>
			<li>
				<LogoLockup />
			</li>
			{#each breadcrumbs as breadcrumb, i}
				<li class="breadcrumb-item">
					<!-- Todo: fix this -->
					<a rel="external" href={breadcrumb.path}>{breadcrumb.cleanName}</a>
				</li>
			{/each}
		</ol>
	{:else if page.url.pathname !== '/'}
		<LogoLockup />
	{/if}
</nav>

<style>
	nav a {
		margin-left: 0.5rem;
		text-decoration: none;
		font-size: 15px;
		color: var(--color-secondary-contrast);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 280px;
		display: block;
	}

	.breadcrumbs {
		flex: 1;
		color: var(--color-secondary-contrast);
		overflow: hidden;
	}

	.breadcrumbs ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		overflow: hidden;
	}

	.breadcrumbs li {
		display: flex;
		align-items: center;
		flex-shrink: 1;
		min-width: 0;
	}

	.breadcrumbs li:not(:last-child)::after {
		content: '→';
		margin-left: 0.5rem;
		color: rgba(255, 255, 255, 0.5);
		flex-shrink: 0;
	}

	@media (max-width: 600px) {
		/* truncate down to logo, last item when small */
		.breadcrumbs li:not(:last-of-type):not(:first-of-type) {
			display: none;
		}
	}
</style>
