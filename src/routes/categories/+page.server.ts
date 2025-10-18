import type { PageServerLoad } from './$types';

export const ssr = true;
export const csr = true;
export const prerender = true;

export const load: PageServerLoad = async ({ locals }) => {
	return {
		tree: locals.tree
	};
};
