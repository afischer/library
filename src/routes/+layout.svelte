<script lang="ts">
	import type { Breadcrumb } from '$lib/types';

	export let data: {
		breadcrumbs: Breadcrumb[];
	};

	export let children;
</script>

<nav>
	<a href="/">Library</a>
	{#if data.breadcrumbs.length}<span>&nbsp;⇾&nbsp;</span>{/if}
	{#each data.breadcrumbs as breadcrumb, i}
		<a href={breadcrumb.path}>{breadcrumb.cleanName}</a>
		{#if i < data.breadcrumbs.length - 1}
			<span>&nbsp;⇾&nbsp;</span>
		{/if}
	{/each}
</nav>

{@render children()}
