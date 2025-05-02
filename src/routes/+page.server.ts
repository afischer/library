import type { ServerLoad } from '@sveltejs/kit';

export const ssr = true;
export const csr = false;
export const prerender = true;

// todo: routematcher for 404
export const load: ServerLoad = async ({ locals }) => {
	return {
		tree: locals.tree
	};
};
