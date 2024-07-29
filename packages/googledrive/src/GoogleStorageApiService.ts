import { mapFileRemoteToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import { type FileListRemote } from './data/response/FileListRemote';
import type { GoogleStorageApiClient } from './GoogleStorageApiClient';
import type { StorageEntity } from './model/StorageEntity';

const FILES_PARTICLE = 'drive/v3/files';

export class GoogleStorageApiService {
  private client: GoogleStorageApiClient;

  constructor(apiClient: GoogleStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string): Promise<StorageEntity[]> {
    const response = await this.client.axiosClient.get<FileListRemote>(
      FILES_PARTICLE,
      {
        params: {
          q: `'${folderId}' in parents and trashed = false`,
        },
      }
    );

    return response.data.files.map(mapFileRemoteToStorageEntity);
  }
}
