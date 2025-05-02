import { google } from 'googleapis';

import type { drive_v3 } from 'googleapis';
import { getAuthClient } from './drive';
import type { GaxiosResponse } from 'gaxios';

// TODO: folder support
export async function search(query: string): Promise<drive_v3.Schema$File[]> {
	const fields =
		'nextPageToken,files(id,name,mimeType,parents,webViewLink,createdTime,modifiedTime,lastModifyingUser)';
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
			fields,
			q: `fullText contains ${JSON.stringify(query)} AND mimeType != 'application/vnd.google-apps.folder' AND trashed = false`
		});
		allFiles.push(...(res.data.files ?? []));
		console.log(`Fetched ${allFiles.length} files...`);
		nextPageToken = res.data.nextPageToken;
		// TEMPORARY
		// nextPageToken = undefined;
	}

	return allFiles;
}
