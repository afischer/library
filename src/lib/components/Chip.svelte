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
		/* display: inline-flex; */
		align-items: center;
		justify-content: center;
		padding: 0.25rem 0.5rem;
		background-color: var(--color-secondary-contrast);
		color: var(--color-secondary);
		text-decoration: none;
		border-radius: 3px;
		transition: background-color 0.3s;
		white-space: nowrap;
	}

	a.chip:hover {
		cursor: pointer;
		background-color: var(--color-primary);
		color: var(--color-secondary-contrast-light);
		text-decoration: none;
	}
</style>
