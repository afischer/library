import { getFile, getNodeFromSlug } from '$lib/server/drive';
import { json } from '@sveltejs/kit';

export async function GET({ params }: { params: { slugPath: string } }) {
	const node = await getNodeFromSlug(params.slugPath);
	if (!node?.file.id) {
		return {
			error: 'File not found',
			status: 404
		};
	}
	const { data: doc } = await getFile(node?.file.id);
	return json(doc);
}
