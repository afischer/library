<script lang="ts">
	import { run } from 'svelte/legacy';

	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { goto } from '$app/navigation';

	const MAX_TYPEAHEAD_ITEMS = 10;

	interface Props {
		typeaheadValues: string[];
	}

	let { typeaheadValues }: Props = $props();
	let searchText: string = $state('');
	let selectedIndex: number = $state(-1);

	let filteredResults =
		$derived(typeaheadValues
			?.filter((title) => searchText && title.toLowerCase().includes(searchText.toLowerCase()))
			?.slice(0, MAX_TYPEAHEAD_ITEMS) ?? []);

	run(() => {
		if (searchText) {
			selectedIndex = -1;
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if (filteredResults.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredResults.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				break;
			case 'Enter':
				if (selectedIndex >= 0) {
					event.preventDefault();
					goto(`/search?q=${filteredResults[selectedIndex]}`);
				}
				break;
			case 'Escape':
				event.preventDefault();
				selectedIndex = -1;
				searchText = '';
				break;
		}
	}

	function handleItemClick(title: string) {
		searchText = title;
		selectedIndex = -1;
	}
</script>

<form method="GET" action="/search">
	<span>
		<input
			type="text"
			name="q"
			placeholder="What are you looking for?"
			bind:value={searchText}
			onkeydown={handleKeydown}
		/>
		<button type="submit">
			<SearchIcon size={16} />
		</button>

		{#if filteredResults.length > 0}
			<span class="typeahead">
				{#each filteredResults as title, index}
					<a
						href={`/search?q=${title}`}
						class:selected={index === selectedIndex}
						onclick={() => handleItemClick(title)}
					>
						{title}
					</a>
				{/each}
			</span>
		{/if}
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

	.typeahead a {
		display: block;
		padding: 5px 15px;
		cursor: pointer;
		text-decoration: none;
	}

	.typeahead a:hover,
	.typeahead a.selected {
		background-color: var(--color-primary);
		color: var(--color-light);
	}
</style>
