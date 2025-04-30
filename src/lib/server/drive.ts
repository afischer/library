// import type { JWT } from 'google-auth-library';
import type { GaxiosPromise, GaxiosResponse } from 'gaxios';
import { google } from 'googleapis';
import type { docs_v1, drive_v3 } from 'googleapis';
import type { JWT } from 'google-auth-library';

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
		// nextPageToken = undefined;
	}

	return allFiles;
}

export interface FileNode {
	file: drive_v3.Schema$File;
	children: FileNode[];
}

let allFiles: drive_v3.Schema$File[] = [];
export const getAllFiles = async () => {
	if (allFiles.length === 0) {
		allFiles = await listAllFiles();
	}
	return allFiles;
};

export async function getFileTree(folderId?: string): Promise<FileNode[]> {
	const allFiles = (await getAllFiles()).filter((file) => !file.name?.startsWith('.DS_Store'));

	// If no folderId provided, get root level files
	const rootFiles = folderId
		? allFiles.filter((file) => !file.parents?.length || file.parents[0] === folderId)
		: allFiles.filter(
				(file) =>
					file.parents?.length === 0 || file?.parents?.[0] === import.meta.env.VITE_GOOGLE_DRIVE_ID
			);

	// sort root files by name
	rootFiles.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0);

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
	const buildTree = (file: drive_v3.Schema$File): FileNode => {
		const node: FileNode = {
			file,
			children: []
		};

		// If this file has children, recursively build their trees
		if (file.id && childrenMap[file.id]) {
			node.children = childrenMap[file.id].map((child) => buildTree(child));
		}

		// sort children by name
		node.children.sort((a, b) => a?.file?.name?.localeCompare(b?.file?.name ?? '') ?? 0);

		return node;
	};

	// Build the tree starting from root files
	return rootFiles.map((file) => buildTree(file));
}
