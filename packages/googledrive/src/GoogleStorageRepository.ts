import { mapFileRemoteToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import type { GoogleStorageApiService } from './GoogleStorageApiService';

export class GoogleStorageRepository {
  private apiService: GoogleStorageApiService;

  constructor(apiService: GoogleStorageApiService) {
    this.apiService = apiService;
  }

  async listFiles(folderId: string) {
    const response = await this.apiService.listFiles(folderId);

    return response.data.files.map(mapFileRemoteToStorageEntity);
  }
}
