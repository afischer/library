<script lang="ts">
	import type { drive_v3 } from 'googleapis';

	export let data: {
		results: drive_v3.Schema$File[];
	};
</script>

<h1>Search Results</h1>

{#each data.results as result}
	<p>{result.name}</p>
{/each}
