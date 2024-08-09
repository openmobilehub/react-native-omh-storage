import { StorageEntityMetadata } from '@openmobilehub/storage-core';

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

  async searchFiles(query: string) {
    const response = await this.apiService.searchFiles(query);

    return response.data.matches.map((match) => {
      return mapMetadataToStorageEntity(match.metadata.metadata);
    });
  }

  async deleteFile(fileId: string) {
    return this.apiService.deleteFile(fileId);
  }

  async getFileMetadata(fileId: string) {
    const response = await this.apiService.getFileMetadata(fileId);

    const storageEntity = mapMetadataToStorageEntity(response.data);

    return new StorageEntityMetadata({
      entity: storageEntity,
      originalMetadata: response.data,
    });
  }
}
