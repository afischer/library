import { search } from '$lib/server/search';
import type { ServerLoad } from '@sveltejs/kit';

export const ssr = true;
export const csr = false;
export const prerender = true;

export const load: ServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q');

	console.log('query', query);

	const results = query ? await search(query) : [];
	return {
		results
	};
};
