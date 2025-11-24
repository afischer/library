<script lang="ts">
	import type { drive_v3 } from 'googleapis';
	import type { Tag } from '$lib/types';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Chip from '$lib/components/Chip.svelte';

	interface SearchResult extends drive_v3.Schema$File {
		cleanName?: string;
		tags?: Tag[];
	}

	interface Props {
		data: {
			query: string;
			results: SearchResult[];
			typeaheadValues: string[];
		};
	}

	let { data }: Props = $props();
</script>

<SearchBar typeaheadValues={data.typeaheadValues} />

{#if data.query}
	<h2>Showing results for '{data.query}':</h2>

	{#each data.results as result}
		<div class="result">
			<h3>
				<a href={result.webViewLink} class="result-title">{result.cleanName || result.name}</a>
			</h3>
			<div class="result-meta">
				{#if result.parents?.[0]}
					Filed under <Chip href={`https://drive.google.com/drive/u/0/folders/${result.parents[0]}`}
						>{result.parents?.[0]}</Chip
					>
				{/if}
				{#if result.lastModifyingUser?.displayName}
					<span class="last-edited">
						Last edited by <strong>{result.lastModifyingUser.displayName.toLowerCase()}</strong>
					</span>
				{/if}
			</div>
		</div>
	{/each}
{/if}

<style>
	:global(main) {
		max-width: 600px;
		margin: 0 auto;
	}

	.result {
		margin-bottom: 30px;
	}

	.result-meta {
		font-size: 0.85rem;
	}
	.result-title {
		display: block;
		font-size: 20px;
		margin-bottom: 8px;
		text-decoration: none;
	}

	.result-title:hover {
		text-decoration: underline;
	}

	.last-edited {
		margin-left: 10px;
	}
</style>
