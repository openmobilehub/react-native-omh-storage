import { mapMetadataToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import type { DropboxStorageApiService } from './DropboxStorageApiService';

export class DropboxStorageRepository {
  private apiService: DropboxStorageApiService;

  constructor(apiService: DropboxStorageApiService) {
    this.apiService = apiService;
  }

  async listFiles(folderId: string) {
    const response = await this.apiService.listFiles(folderId);

    return response.data.entries.map(mapMetadataToStorageEntity);
  }
}
