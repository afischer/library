<script lang="ts">
	import type { drive_v3 } from 'googleapis';

	interface Props {
		data: {
			results: drive_v3.Schema$File[];
		};
	}

	let { data }: Props = $props();
</script>

<h1>Search Results</h1>

{#each data.results as result}
	<p>{result.name}</p>
{/each}
