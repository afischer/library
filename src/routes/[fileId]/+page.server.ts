import { getFile, getAllFilesInDrive } from '$lib/server/drive';

export const ssr = true;
export const csr = false;
export const prerender = true;

export async function load({ params, locals }: { params: { fileId: string } }) {
	const { data } = await getFile(params.fileId);

	return {
		doc: data,
		tree: locals.tree
	};
}
