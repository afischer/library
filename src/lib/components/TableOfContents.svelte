<script lang="ts">
	import type { Heading } from '$lib/types';

	export let headings: Heading[];

	const nestedHeadings = headings.reduce(
		(acc, heading) => {
			if (heading.level > 3) return acc; // for now
			if (heading.level === 1 || heading.level === 2) {
				acc.push({ heading, children: [] });
			} else {
				acc[acc.length - 1]?.children?.push(heading);
			}
			return acc;
		},
		[] as { heading: Heading; children: Heading[] }[]
	);
</script>

{#if headings.length > 0}
	<strong>Table of Contents:</strong>
	<ul>
		{#each nestedHeadings as heading}
			<li>
				<a href={`#${heading.heading.hash}`} class:nested={heading.heading.level === 2}
					>{heading.heading.title}</a
				>
				{#if heading.children.length > 0}
					<ul>
						{#each heading.children as child}
							<li><a href={`#${child.hash}`}>{child.title}</a></li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	strong {
		font-weight: 600;
		font-size: 14px;
	}

	ul {
		font-size: 14px;

		list-style-type: none;
		padding: 0;
	}

	li a {
		text-decoration: none;
		color: var(--color-text);
	}

	li a.nested {
		display: flex;
	}

	li a.nested::before {
		content: '—';
		margin-right: 10px;
	}

	ul li {
		padding: 0.25rem 0rem;
		border-bottom: 1px solid var(--color-secondary-contrast);
	}

	ul li ul li {
		border-bottom: none;
		list-style-type: '—';
		padding-left: 0.75rem;
		margin-left: 1rem;
	}
</style>
