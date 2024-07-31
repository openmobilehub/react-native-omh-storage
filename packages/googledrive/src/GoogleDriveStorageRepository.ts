import { mapFileRemoteToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import type { GoogleDriveStorageApiService } from './GoogleDriveStorageApiService';

export class GoogleDriveStorageRepository {
  private apiService: GoogleDriveStorageApiService;

  constructor(apiService: GoogleDriveStorageApiService) {
    this.apiService = apiService;
  }

  async listFiles(folderId: string) {
    const response = await this.apiService.listFiles(folderId);

    return response.data.files.map(mapFileRemoteToStorageEntity);
  }
}
