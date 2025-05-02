<script lang="ts">
	import type { FileTreeNode } from '$lib/types';

	export let data: {
		tree: FileTreeNode;
	};

	export let children;
</script>

<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
	{JSON.stringify(data)}
</nav>

{@render children()}
