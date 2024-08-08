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
}
