import { getFile, getAllFilesInDrive, getNodeFromSlug } from '$lib/server/drive';

export const ssr = true;
export const csr = false;
export const prerender = true;

export async function load({ params, locals }: { params: { slugPath: string } }) {
	// const { data } = await getFile(params.fileId);

	console.log(params);

	const node = await getNodeFromSlug(params.slugPath);
	if (!node?.file.id) {
		return {
			error: 'File not found',
			status: 404
		};
	}

	const { data: doc } = await getFile(node?.file.id);

	return {
		doc
		// tree: locals.tree
	};
}
