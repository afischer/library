import { search } from '$lib/server/search';
import { getTags, getCleanName } from '$lib/server/metadata';
import type { ServerLoad } from '@sveltejs/kit';

export const ssr = true;
export const csr = true;
export const prerender = true;

export const load: ServerLoad = async ({ url, locals }) => {
	const query = url.searchParams.get('q') || '';

	console.log('query', query);

	const rawResults = query ? await search(query) : [];

	// Process results to include clean names and tags
	const results = rawResults.map((file) => ({
		...file,
		cleanName: getCleanName(file.name || ''),
		tags: getTags(file.name || '')
	}));

	return {
		query,
		results,
		typeaheadValues: locals.titles || []
	};
};
