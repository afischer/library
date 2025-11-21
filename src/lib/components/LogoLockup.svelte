<script>
	import BookIcon from './icons/BookIcon.svelte';

	export let size = 24;
</script>

<h1>
	<a href="/" aria-label="Home">
		<BookIcon {size} />
		<span class="brand-text" style:font-size="{size * 0.8}px">Library</span>
	</a>
</h1>

<style>
	h1 {
		margin: 0;
	}

	h1 a {
		color: inherit;
		display: flex;
		align-items: center;
		text-decoration: none;
		font-family: var(--font-brand);
	}

	.brand-text {
		margin-left: 0.6rem;
		padding-left: 1rem;
		border-left: 1px solid var(--color-secondary);
	}
</style>
