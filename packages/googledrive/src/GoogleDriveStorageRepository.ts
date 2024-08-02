import { StorageEntityMetadata } from '@openmobilehub/storage-core';

import { mapFileRemoteToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import { mapPermissionRemoteToStoragePermission } from './data/mappers/mapPermissionRemoteToStoragePermission';
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

  async getFileMetadata(fileId: string) {
    const response = await this.apiService.getFileMetadata(fileId);

    const storageEntity = mapFileRemoteToStorageEntity(response.data);

    return new StorageEntityMetadata({
      entity: storageEntity,
      originalMetadata: response.data,
    });
  }

  async search(query: string) {
    const response = await this.apiService.search(query);

    return response.data.files.map(mapFileRemoteToStorageEntity);
  }

  async getPermissions(fileId: string) {
    const response = await this.apiService.getPermissions(fileId);

    return response.data.permissions.map(
      mapPermissionRemoteToStoragePermission
    );
  }
}
