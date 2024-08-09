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
}
