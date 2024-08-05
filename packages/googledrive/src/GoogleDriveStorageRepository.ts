import type { LocalFile } from '@openmobilehub/storage-core';
import { StorageEntityMetadata } from '@openmobilehub/storage-core';

import type { CreateFileRequestBody } from './data/body/CreateFileRequestBody';
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

  async createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId?: string
  ) {
    const body: CreateFileRequestBody = {
      name,
      mimeType,
      parents: parentId ? [parentId] : [],
    };

    const response = await this.apiService.createFileWithMimeType(body);

    return mapFileRemoteToStorageEntity(response.data);
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    const response = await this.apiService.localFileUpload(file, folderId);

    if (!response) {
      throw new Error('Upload failed, no response received');
    }

    return mapFileRemoteToStorageEntity(response);
  }
}
