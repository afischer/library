<script lang="ts">
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
</script>

<form method="GET" action="/search">
	<span>
		<input type="text" name="q" placeholder="What are you looking for?" />
		<button type="submit">
			<SearchIcon size={16} />
		</button>
	</span>
</form>
