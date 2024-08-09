import type { StorageEntity } from '@openmobilehub/storage-core';

import { mapDriveItemToStorageEntity } from './data/mappers/mapDriveItemToStorageEntity';
import type { OneDriveStorageApiService } from './OneDriveStorageApiService';

export class OneDriveStorageRepository {
  private apiService: OneDriveStorageApiService;

  constructor(apiService: OneDriveStorageApiService) {
    this.apiService = apiService;
  }

  async listFiles(folderId: string) {
    const response = await this.apiService.listFiles(folderId);

    return response.data.value.map(mapDriveItemToStorageEntity);
  }

  async downloadFile(file: StorageEntity) {
    return this.apiService.downloadFile(file);
  }
}
