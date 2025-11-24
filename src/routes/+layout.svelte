<script lang="ts">
	import type { Breadcrumb } from '$lib/types';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	interface Props {
		data: {
			breadcrumbs: Breadcrumb[];
		};
		children: any;
	}

	let { data, children }: Props = $props();
</script>

<header>
	<Breadcrumbs breadcrumbs={data.breadcrumbs} />
</header>

<main>
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

	main {
		padding-top: 80px;
	}
</style>
