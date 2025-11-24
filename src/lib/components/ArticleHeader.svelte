<script lang="ts">
	import type { FileTreeNode } from '$lib/types';
	import type { docs_v1, drive_v3 } from 'googleapis';

	interface Props {
		node: FileTreeNode;
		revision: drive_v3.Schema$Revision;
		firstElement: docs_v1.Schema$StructuralElement | undefined;
	}

	let { node, revision, firstElement }: Props = $props();

	const bylineOverride = firstElement?.paragraph?.elements?.[0]?.textRun?.content?.startsWith('By')
		? firstElement.paragraph.elements[0].textRun.content.replace('By ', '')
		: undefined;

	function relativeTime(time: string): string {
		const now = new Date();
		const then = new Date(time);
		const diff = now.getTime() - then.getTime();

		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) {
			return years === 1 ? '1 year ago' : `${years} years ago`;
		} else if (months > 0) {
			return months === 1 ? '1 month ago' : `${months} months ago`;
		} else if (days > 0) {
			return days === 1 ? '1 day ago' : `${days} days ago`;
		} else if (hours > 0) {
			return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
		} else if (minutes > 0) {
			return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
		} else {
			return 'Just now';
		}
	}
</script>

<h1>{node?.cleanName}</h1>
<div class="author-info">
	{#if revision}
		<p>
			{#if bylineOverride}
				By <span class="name">{bylineOverride}</span>.
			{:else if revision.lastModifyingUser && revision.modifiedTime && revision.lastModifyingUser?.displayName}
				Created by <span class="name">{revision.lastModifyingUser.displayName}</span>
				{relativeTime(revision.modifiedTime)}.
			{/if}
		</p>
		<p>
			{#if node.file.lastModifyingUser && node.file.modifiedTime}
				Last edited by <span class="name">{node.file.lastModifyingUser.displayName}</span>
				{relativeTime(node.file.modifiedTime)}.
			{:else if node.file.modifiedTime}
				Last edited {relativeTime(node.file.modifiedTime)}.
			{/if}
		</p>
	{/if}
</div>

<style>
	.author-info {
		border-bottom: 5px solid var(--color-gray);
		padding: 0.5rem 0 2rem 0;
		font-size: 13px;
		color: var(--color-secondary);
	}

	.author-info p {
		line-height: 0.25;
	}

	.name {
		color: var(--color-dark);
		font-weight: 400;
	}
</style>
