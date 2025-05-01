// src/hooks.server.ts
import { getFileTree, getNodeFromSlug } from '$lib/server/drive';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// attaches the subtree of the current path to locals

	const slugParts = event.params.slugPath?.split('/');

	event.locals.tree = await (slugParts ? getNodeFromSlug(slugParts.join('/')) : getFileTree());
	// event.locals.requestId = getUniqueId();

	const response = await resolve(event);
	return response;
};
