<script lang="ts">
	import type { docs_v1 } from 'googleapis';
	import Chip from '../Chip.svelte';

	interface Props {
		person: docs_v1.Schema$Person;
	}

	let { person }: Props = $props();

	const name = person.personProperties?.name || 'Unknown';
	const email = person.personProperties?.email;
</script>

<Chip href={`mailto:${email}`}>
	{name}
</Chip>
