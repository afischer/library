<script lang="ts">
	interface Props {
		href: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();
</script>

{#if href}
	<a {href} class="button" target="_blank" rel="noopener noreferrer">
		{@render children?.()}
	</a>
{:else}
	<button class="button">
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		line-height: 20px;
		font-weight: 400;
		font-style: normal;
		font-family: var(--font-sans);
		background-color: transparent;
		display: inline-block;
		cursor: pointer;
		-webkit-font-smoothing: antialiased;
		box-shadow: var(--color-secondary-contrast-light) 5px 5px 0px 0px;
		margin-right: 10px;
		color: var(--color-secondary);
		margin-top: 10px;
		transition: background-color 0.3s;
		padding: 7px 10px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-secondary);
		border-image: initial;
		border-radius: 3px;
		text-decoration: none;
	}

	.button:hover {
		background-color: var(--color-secondary);
		color: var(--color-light);
	}
</style>
