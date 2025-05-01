import type { drive_v3 } from 'googleapis';

/**
 * Tags defined by the user. These are used for special UI treatments.
 * - home: act as index page for a category/folder
 * - hidden: do not display this file in the UI
 * - team: display on home page as a team page to jump to immediately
 */
export type Tag = 'home' | 'hidden' | 'team';

/**
 * Information derived from the google drive file name
 */
export interface FilenameMetadata {
	/**
	 * The name of the file without any tags or leading ordering information
	 */
	cleanName: string;
	/**
	 * The tags in the file name
	 */
	tags: Tag[];
	/**
	 * The ordering information in the file name
	 */
	ordering: number | null;
	/**
	 * Sluggified version of the clean name, with no special characters or tags.
	 */
	slug: string;
}

export type FileTreeNode = FilenameMetadata & {
	file: drive_v3.Schema$File;
	children: FileTree;
};

export type FileTree = Record<FilenameMetadata['slug'], FileTreeNode>;

export enum BuildingBlockBoundary {
	CODE = '\ue907'
}
