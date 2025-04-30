import { getFile, getAllFilesInDrive, getFileTree } from '$lib/server/drive';

export const ssr = true;
export const csr = false;
export const prerender = true;

export async function load({ params, locals }: { params: { fileId: string } }) {
	const tree = await getFileTree();

	return {
		tree: tree
	};
}
