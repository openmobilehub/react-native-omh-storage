import type { LocalFile, StorageEntity } from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
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

  async localFileUpload(file: LocalFile, folderId: string) {
    const response = await this.apiService.localFileUpload(
      file.uri,
      file.name,
      folderId
    );

    if (!response) {
      throw new Error('Upload failed, no response received');
    }

    return response;
  }

  async createFolder(name: string, parentId?: string): Promise<StorageEntity> {
    const response = await this.apiService.createFolder(
      parentId || ROOT_FOLDER,
      {
        'name': name,
        'folder': {},
        '@microsoft.graph.conflictBehavior': 'rename',
      }
    );

    return mapDriveItemToStorageEntity(response.data);
  }

  async createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId?: string
  ): Promise<StorageEntity> {
    const fullFileName = `${name}.${fileExtension}`;

    const response = await this.apiService.createFile(
      fullFileName,
      parentId || ROOT_FOLDER
    );

    return mapDriveItemToStorageEntity(response.data);
  }
}
