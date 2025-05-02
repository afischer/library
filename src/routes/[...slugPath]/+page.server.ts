import { getFile, getFirstRevision } from '$lib/server/drive';
import type { ServerLoad } from '@sveltejs/kit';

export const ssr = true;
export const csr = false;
export const prerender = true;

// todo: routematcher for 404
export const load: ServerLoad = async ({ locals }) => {
	console.log('>>>>', locals);
	if (!locals.tree?.file.id) {
		return {
			error: 'File not found',
			status: 404
		};
	}

	// todo: ensure file being fetched is of a supported type (i.e., not a folder or slide deck)
	// todo: parallelize these requests
	const { data: doc } = await getFile(locals.tree.home?.file.id ?? locals.tree.file.id);
	const { data: revision } = await getFirstRevision(
		locals.tree.home?.file.id ?? locals.tree.file.id
	);
	return {
		doc,
		revision,
		tree: locals.tree
	};
};
