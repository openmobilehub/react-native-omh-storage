import type { StorageEntity } from '@openmobilehub/storage-core';
import { Dirs, FileSystem } from 'react-native-file-access';

import { CONTENT_URL } from './data/constants/constants';
import { type FileListRemote } from './data/response/FileListRemote';
import type { SearchFileListRemote } from './data/response/SearchFileListRemote';
import type { DropboxStorageApiClient } from './DropboxStorageApiClient';

const FILES_PARTICLE = 'files';

export class DropboxStorageApiService {
  private client: DropboxStorageApiClient;

  constructor(apiClient: DropboxStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string) {
    return await this.client.axiosClient.post<FileListRemote>(
      `${FILES_PARTICLE}/list_folder`,
      {
        path: folderId,
      }
    );
  }

  async searchFiles(query: string) {
    const response = await this.client.axiosClient.post<SearchFileListRemote>(
      `${FILES_PARTICLE}/search_v2`,
      {
        query,
      }
    );

    return response;
  }

  async deleteFile(fileId: string) {
    await this.client.axiosClient.post(`${FILES_PARTICLE}/delete_v2`, {
      path: fileId,
    });
  }

  async getFileMetadata(fileId: string) {
    return await this.client.axiosClient.post(
      `${FILES_PARTICLE}/get_metadata`,
      {
        path: fileId,
      }
    );
  }
  async downloadFile(file: StorageEntity) {
    const accessToken = this.client.getAccessToken();
    const filePath = Dirs.DocumentDir + `/${file.name}`;
    const dropboxArgs = JSON.stringify({ path: file.id });

    return await FileSystem.fetch(`${CONTENT_URL}${FILES_PARTICLE}/download`, {
      path: filePath,
      method: 'POST',
      headers: {
        'Authorization': accessToken,
        'Dropbox-API-Arg': dropboxArgs,
      },
    });
  }
}
