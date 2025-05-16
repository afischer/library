<script lang="ts">
	import { page } from '$app/state';
	import type { Breadcrumb } from '$lib/types';
	import LogoLockup from '$lib/components/LogoLockup.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	export let data: {
		breadcrumbs: Breadcrumb[];
	};

	export let children;

	const isHome = page.url.pathname === '/';
</script>

<header>
	<Breadcrumbs breadcrumbs={data.breadcrumbs} />
</header>

<main class:bg-dark={isHome}>
	{@render children()}
</main>

<style>
	header {
		height: 50px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		width: 100%;
		background-color: var(--color-secondary);
		color: var(--color-secondary-contrast);
		padding-left: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bg-dark {
		background-color: var(--color-dark);
	}
</style>
