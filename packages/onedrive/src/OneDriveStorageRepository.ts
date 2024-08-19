import {
  StorageEntityMetadata,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { mapDriveItemToStorageEntity } from './data/mappers/mapDriveItemToStorageEntity';
import { mapPermissionRemoteToPermission } from './data/mappers/mapPermissionRemoteToPermission';
import {
  mapRoleToRemoteRole,
  mapToInviteRequestBody,
} from './data/mappers/mapToInviteRequestBody';
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

  async getFileMetadata(fileId: string) {
    const response = await this.apiService.getFileMetadata(fileId);

    const storageEntity = mapDriveItemToStorageEntity(response.data);

    return new StorageEntityMetadata({
      entity: storageEntity,
      originalMetadata: response.data,
    });
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

  async getPermissions(fileId: string) {
    const response = await this.apiService.getPermissions(fileId);

    return response.data.value.map(mapPermissionRemoteToPermission);
  }

  async getWebUrl(fileId: string) {
    const response = await this.apiService.getFileMetadata(fileId);
    return response.data.webUrl;
  }

  async createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const body = mapToInviteRequestBody(
      role,
      recipient,
      sendNotificationEmail,
      emailMessage
    );
    const response = await this.apiService.createPermission(fileId, body);
    return response.data.value.map(mapPermissionRemoteToPermission)[0];
  }

  async deletePermission(fileId: string, permissionId: string) {
    await this.apiService.deletePermission(fileId, permissionId);
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    const body = {
      roles: [mapRoleToRemoteRole(role)],
    };

    const response = await this.apiService.updatePermission(
      fileId,
      permissionId,
      body
    );

    return mapPermissionRemoteToPermission(response.data);
  }
}
