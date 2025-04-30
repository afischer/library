import { getFile } from '$lib/server/drive';
import { json } from '@sveltejs/kit';

export async function GET({ params }: { params: { fileId: string } }) {
	const fileId = params.fileId.replace('.json', '');
	const { data } = await getFile(fileId);
	return json(data);
}
