import type { Tag } from '$lib/types';

/**
 * Tags are defined by placing a pipe "|" at the end of your filename, followed
 * by a comma separated list of tags.
 * @param filename string filename
 */
export function getTags(filename: string): Tag[] {
	const tags = filename
		.toLowerCase()
		.split(' | ')
		.pop()
		?.split(',')
		.map((tag) => tag.trim());
	// TODO: verify tags match expected values, warn if there's a rogue tag
	return (tags as Tag[]) ?? [];
}

const orderingRegex: RegExp = /^\s*([0-9]+)\s*[-.)\]]\s*/;

/**
 * You can place a number at the beginning of your filename to order it, followed
 * by a dash, period, close paren, or bracket.
 */
export function getOrdering(filename: string): number | null {
	const match = filename.match(orderingRegex);
	return match ? parseInt(match[1]) : null;
}

/**
 * Returns the filename without any tags or ordering information.
 */
export function getCleanName(filename: string): string {
	return filename.replace(orderingRegex, '').split(' | ')[0].trim();
}
