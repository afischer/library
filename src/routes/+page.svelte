<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import { search } from '$lib/server/search';

	export let data: {
		results: drive_v3.Schema$File[];
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each data.results as result}
	<p>{result.name}</p>
{/each} -->

<h1>NYT Library</h1>

<form method="GET" action="/search">
	<input type="text" name="q" />
	<button type="submit">Search</button>
</form>
