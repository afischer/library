import { getBreadcrumbs } from '$lib/server/drive';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	return { breadcrumbs: params.slugPath ? await getBreadcrumbs(params.slugPath) : [] };
};
