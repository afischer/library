import { getFile, getFirstRevision, getHeadings } from '$lib/server/drive';
import type { ServerLoad } from '@sveltejs/kit';

export const ssr = true;
export const csr = true;
export const prerender = false;

// todo: routematcher for 404
export const load: ServerLoad = async ({ locals }) => {
	if (!locals.tree?.file.id) {
		return {
			error: 'File not found',
			status: 404
		};
	}
	console.log('>>>>>>> running page server load');
	// todo: ensure file being fetched is of a supported type (i.e., not a folder or slide deck)
	// todo: parallelize these requests

	const isFolderOnly =
		!locals.tree.home?.file.id &&
		locals.tree.file.mimeType === 'application/vnd.google-apps.folder';
	const fileId = locals.tree.home?.file.id ?? locals.tree.file.id;
	const { data: doc } = isFolderOnly ? { data: undefined } : await getFile(fileId);
	const revision = isFolderOnly ? {} : await getFirstRevision(fileId);

	return {
		doc,
		headings: getHeadings(doc?.body?.content ?? []),
		revision,
		tree: locals.tree,
		titles: locals.titles
	};
};
