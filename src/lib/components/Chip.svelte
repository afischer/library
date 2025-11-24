<script lang="ts">
	interface Props {
		href: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();
</script>

{#if href}
	<a {href} class="chip">
		{@render children?.()}
	</a>
{:else}
	<div class="chip">
		{@render children?.()}
	</div>
{/if}

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 5px 10px;
		background-color: #000;
		color: var(--color-secondary-contrast);
		text-decoration: none;
	}

	a.chip:hover {
		cursor: pointer;
		color: var(--color-primary);
		text-decoration: none;
	}
</style>
