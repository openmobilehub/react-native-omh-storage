import { type FileListRemote } from './data/response/FileListRemote';
import type { SearchFileListRemote } from './data/response/SearchFileListRemote';
import type { DropboxStorageApiClient } from './DropboxStorageApiClient';

const LIST_FOLDER_PARTICLE = 'files';

export class DropboxStorageApiService {
  private client: DropboxStorageApiClient;

  constructor(apiClient: DropboxStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string) {
    return await this.client.axiosClient.post<FileListRemote>(
      `${LIST_FOLDER_PARTICLE}/list_folder`,
      {
        path: folderId,
      }
    );
  }

  async searchFiles(query: string) {
    const response = await this.client.axiosClient.post<SearchFileListRemote>(
      `${LIST_FOLDER_PARTICLE}/search_v2`,
      {
        query,
      }
    );

    return response;
  }
}
