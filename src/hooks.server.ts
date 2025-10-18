// src/hooks.server.ts
import { getFileTree, getNodeFromSlug } from '$lib/server/drive';
import type { FileTreeNode } from '$lib/types';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// attaches the subtree of the current path to locals
	const slugParts = event.params.slugPath?.split('/');
	const tree = await getFileTree();
	event.locals.tree = await (slugParts ? getNodeFromSlug(slugParts.join('/')) : getFileTree());

	function getAllTitles(node: FileTreeNode) {
		let titles = [node.cleanName];
		for (const child of Object.values(node.children || {})) {
			titles = titles.concat(getAllTitles(child));
		}
		return titles;
	}

	event.locals.titles = getAllTitles(tree);
	return resolve(event);
};
