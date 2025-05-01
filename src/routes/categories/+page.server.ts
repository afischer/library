import type { PageServerLoad } from './$types';

export const ssr = true;
export const csr = false;
export const prerender = true;

export const load: PageServerLoad = async ({ locals }) => {
	return {
		tree: locals.tree
	};
};
