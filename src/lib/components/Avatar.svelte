<script lang="ts">
	import type { drive_v3 } from 'googleapis';

	export let user: drive_v3.Schema$User;

	const initials = user?.displayName
		?.split(' ')
		.map((name) => name[0])
		.join('');
</script>

{#if user.photoLink}
	<img src={user.photoLink} alt="{user?.displayName ?? 'unknown user'} photo" />
{:else}
	<span class="avatar-placeholder">{initials}</span>
{/if}

<style>
	.avatar-placeholder {
		background-color: #ccc;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	img {
		background-color: #ccc;
		width: 32px;
		height: 32px;
		max-width: 32px;
		max-height: 32px;
		border-radius: 50%;
		object-fit: cover;
		object-position: center;
		vertical-align: middle;
	}
</style>
