// import type { JWT } from 'google-auth-library';
import type { GaxiosPromise, GaxiosResponse } from 'gaxios';
import { google } from 'googleapis';
import type { docs_v1, drive_v3 } from 'googleapis';
import type { JWT } from 'google-auth-library';
import type { FileTree, FileTreeNode } from '$lib/types';
import { getOrdering } from './metadata';
import { getTags } from './metadata';
import slugify from 'slugify';
import { getCleanName } from './metadata';

export async function getAuthClient(): Promise<JWT> {
	const scopes = [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/cloud-platform',
		'https://www.googleapis.com/auth/datastore'
	];
	console.info('Trying to parse client credentials via GOOGLE_APPLICATION_JSON.');
	const jsonCredentials = JSON.parse(import.meta.env.VITE_GOOGLE_APPLICATION_JSON);
	const auth = new google.auth.GoogleAuth({
		credentials: jsonCredentials,
		scopes: scopes
	});
	const authClient = (await auth.getClient()) as JWT;

	google.options({ auth: authClient });
	console.info('Google API auth successfully retrieved.');

	return authClient;
}

export async function getFile(fileId: string): GaxiosPromise<docs_v1.Schema$Document> {
	const authClient = await getAuthClient();
	const docs = google.docs({ version: 'v1' });
	return docs.documents.get({ documentId: fileId, auth: authClient });
}

async function listAllFiles(): Promise<drive_v3.Schema$File[]> {
	const fields =
		'nextPageToken,files(id,name,mimeType,parents,webViewLink,createdTime,modifiedTime,lastModifyingUser, owners)';
	const authClient = await getAuthClient();
	const drive = google.drive({ version: 'v3' });

	let nextPageToken: string | null | undefined = null;

	const allFiles: drive_v3.Schema$File[] = [];
	while (nextPageToken !== undefined) {
		const res: GaxiosResponse<drive_v3.Schema$FileList> = await drive.files.list({
			corpora: 'drive',
			includeItemsFromAllDrives: true,
			supportsAllDrives: true,
			driveId: import.meta.env.VITE_GOOGLE_DRIVE_ID,
			auth: authClient,
			pageSize: 1000,
			pageToken: nextPageToken as string | undefined,
			fields
		});
		allFiles.push(...(res.data.files ?? []));
		console.log(`Fetched ${allFiles.length} files...`);
		nextPageToken = res.data.nextPageToken;
		// TEMPORARY
		nextPageToken = undefined;
	}

	return allFiles;
}

let allFiles: drive_v3.Schema$File[] = [];
let inFlightPromise: Promise<drive_v3.Schema$File[]> | null = null;

export const getAllFiles = async () => {
	if (allFiles.length === 0) {
		if (!inFlightPromise) {
			inFlightPromise = listAllFiles().then((files) => {
				allFiles = files;
				inFlightPromise = null;
				return files;
			});
		}
		return inFlightPromise;
	}
	return allFiles;
};

// Returns the root filetree node
export async function getFileTree(folderId?: string): Promise<FileTreeNode> {
	const allFiles = (await getAllFiles()).filter((file) => !file.name?.startsWith('.DS_Store'));

	// If no folderId provided, get root level files
	const rootFiles = folderId
		? allFiles.filter((file) => !file.parents?.length || file.parents[0] === folderId)
		: allFiles.filter(
				(file) =>
					file.parents?.length === 0 || file?.parents?.[0] === import.meta.env.VITE_GOOGLE_DRIVE_ID
			);

	// Create a map of parent ID to children
	const childrenMap = allFiles.reduce((acc: Record<string, drive_v3.Schema$File[]>, file) => {
		const parentId = file.parents?.[0];
		if (parentId) {
			if (!acc[parentId]) {
				acc[parentId] = [];
			}
			acc[parentId].push(file);
		}
		return acc;
	}, {});

	// Recursive function to build the tree
	const buildTree = (file: drive_v3.Schema$File): FileTreeNode => {
		if (!file.name) throw new Error(`File ${file.id} has no name.`);
		const cleanName = getCleanName(file.name);

		const node: FileTreeNode = {
			file,
			cleanName,
			tags: getTags(file.name),
			ordering: getOrdering(file.name),
			slug: slugify(cleanName, { lower: true, strict: true }),
			children: {}
		};

		// If this file has children, recursively build their trees
		if (file.id && childrenMap[file.id]) {
			node.children = childrenMap[file.id].reduce((acc: FileTree, child) => {
				const childNode = buildTree(child);
				acc[childNode.slug] = childNode;
				return acc;
			}, {});
		}

		return node;
	};

	// Build the tree starting from root files
	return {
		file: {
			id: '',
			name: '',
			mimeType: 'application/vnd.google-apps.folder'
		} as drive_v3.Schema$File,
		cleanName: '',
		tags: [],
		ordering: null,
		slug: '',
		children: rootFiles.reduce((acc: FileTree, file) => {
			const node = buildTree(file);
			acc[node.slug] = node;
			return acc;
		}, {})
	};
}

export async function getNodeFromSlug(slug: string): Promise<FileTreeNode | undefined> {
	const tree = await getFileTree();

	// split the path into parts
	const parts = slug.split('/');

	// move through the tree, looking for the node that matches the slug
	let currentNode = tree.children[parts[0]];
	parts.shift(); // remove the first part
	console.log('at', currentNode?.cleanName);
	for (const part of parts) {
		currentNode = currentNode?.children[part];
		console.log('> at', currentNode?.cleanName, 'for', part);
	}
	return currentNode;
}
