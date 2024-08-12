import { type StorageEntity } from '@openmobilehub/storage-core';
import { Dirs, FileSystem } from 'react-native-file-access';

import { type FileListRemote } from './data/response/FileListRemote';
import type { OneDriveStorageApiClient } from './OneDriveStorageApiClient';

const DRIVES_PARTICLE = 'me/drive';
const ITEMS_PARTICLE = `${DRIVES_PARTICLE}/items`;

export class OneDriveStorageApiService {
  private client: OneDriveStorageApiClient;

  constructor(apiClient: OneDriveStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(parentId: string) {
    return await this.client.axiosClient.get<FileListRemote>(
      `${ITEMS_PARTICLE}/${parentId}/children`
    );
  }

  async downloadFile(file: StorageEntity) {
    const filePath = `${Dirs.DocumentDir}/${file.name}`;

    const response = await this.client.axiosClient.get(
      `${ITEMS_PARTICLE}/${file.id}/content`,
      {
        responseType: 'blob',
      }
    );

    const downloadUrl = response.request.responseURL;

    return FileSystem.fetch(downloadUrl, {
      path: filePath,
      method: 'GET',
    });
  }
}
