import {
  CreatePermission,
  StorageEntityMetadata,
  type LocalFile,
} from '@openmobilehub/storage-core';

import type { CommonRequestBody } from './data/body/CommonRequestBody';
import type { CreateFileRequestBody } from './data/body/CreateFileRequestBody';
import { mapCreatePermissionToRequestBody } from './data/mappers/mapCreatePermissionToRequestBody';
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

  async deleteFile(fileId: string) {
    const metadata: CommonRequestBody = {
      trashed: true,
    };
    return this.apiService.updateFileMetadata(fileId, metadata);
  }

  async permanentlyDeleteFile(fileId: string) {
    return this.apiService.deleteFile(fileId);
  }

  async getPermissions(fileId: string) {
    const response = await this.apiService.getPermissions(fileId);

    return response.data.permissions.map(
      mapPermissionRemoteToStoragePermission
    );
  }

  async getWebUrl(fileId: string) {
    const response = await this.apiService.getWebUrl(fileId);

    return response.data.webViewLink;
  }

  async createPermission(
    fileId: string,
    permission: CreatePermission,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const body = mapCreatePermissionToRequestBody(permission);

    const transferOwnership = permission.role === 'owner';
    const willSendNotificationEmail =
      sendNotificationEmail || transferOwnership;
    const message = emailMessage?.trim() ? emailMessage : undefined;

    const response = await this.apiService.createPermission(
      fileId,
      body,
      transferOwnership,
      willSendNotificationEmail,
      message
    );

    return mapPermissionRemoteToStoragePermission(response.data);
  }
}
