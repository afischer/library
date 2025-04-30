import { getAllFilesInDrive, getFileTree } from '$lib/server/drive';
import { json } from '@sveltejs/kit';

export async function GET() {
	const tree = await getFileTree();
	return json(tree);
}
