import { getFile } from '$lib/server/drive';
import type { PageServerLoad } from './$types';

export const ssr = true;
export const csr = false;
export const prerender = true;

export const load: PageServerLoad = async ({ locals }) => {
	console.log('>>>>', locals);
	if (!locals.tree.file.id) {
		return {
			error: 'File not found',
			status: 404
		};
	}

	console.log(locals.tree);
	const { data: doc } = await getFile(locals.tree.file.id);

	return {
		doc
	};
};
