import { type FileListRemote } from './data/response/FileListRemote';
import type { DropboxStorageApiClient } from './DropboxStorageApiClient';

const LIST_FOLDER_PARTICLE = 'files/list_folder';

export class DropboxStorageApiService {
  private client: DropboxStorageApiClient;

  constructor(apiClient: DropboxStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string) {
    return await this.client.axiosClient.post<FileListRemote>(
      LIST_FOLDER_PARTICLE,
      {
        path: folderId,
      }
    );
  }
}
