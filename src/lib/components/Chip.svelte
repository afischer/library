<script lang="ts">
	export let href: string | undefined;
</script>

{#if href}
	<a {href} class="chip">
		<slot />
	</a>
{:else}
	<div class="chip">
		<slot />
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
