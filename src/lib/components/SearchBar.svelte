<script lang="ts">
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';

	const MAX_TYPEAHEAD_ITEMS = 10;

	export let typeaheadValues: string[];
	let searchText: string = '';
</script>

<form method="GET" action="/search">
	<span>
		<input type="text" name="q" placeholder="What are you looking for?" bind:value={searchText} />
		<button type="submit">
			<SearchIcon size={16} />
		</button>

		<span class="typeahead">
			{#each typeaheadValues
				?.filter((title) => searchText && title.toLowerCase().includes(searchText.toLowerCase()))
				?.slice(0, MAX_TYPEAHEAD_ITEMS) as title}
				<span>{title}</span>
			{/each}
		</span>
	</span>
</form>

<style>
	.typeahead {
		display: block;
		border: 1px solid var(--color-secondary);
		border-top: none;
		z-index: 90;
		position: absolute;
		width: 595px;
		margin-top: -1px;
		background-color: var(--color-light);
	}

	.typeahead span {
		display: block;
		padding: 5px 15px;
		cursor: pointer;
	}

	.typeahead span:hover {
		background-color: var(--color-primary);
	}
</style>
