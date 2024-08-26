import type { StorageEntity } from '@openmobilehub/storage-core';
import {
  StorageEntityMetadata,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type { CommonRequestBody } from './data/body/CommonRequestBody';
import type { CreateFileRequestBody } from './data/body/CreateFileRequestBody';
import type { UpdatePermissionRequestBody } from './data/body/UpdatePermissionRequestBody';
import { FOLDER_MIME_TYPE } from './data/constants/constants';
import { mapFileRemoteToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import {
  mapPermissionRecipientToRequestBody,
  mapPermissionRoleToRoleRemote,
} from './data/mappers/mapPermissionRecipientToRequestBody';
import { mapPermissionRemoteToStoragePermission } from './data/mappers/mapPermissionRemoteToStoragePermission';
import { mapVersionRemoteToFileVersion } from './data/mappers/mapVersionRemoteToFileViersion';
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

  async createFolder(name: string, parentId?: string) {
    return await this.createFileWithMimeType(name, FOLDER_MIME_TYPE, parentId);
  }

  async exportFile(
    file: StorageEntity,
    mimeType: string,
    fileExtension: string,
    saveDirectory: string
  ) {
    return this.apiService.exportFile(
      file,
      mimeType,
      fileExtension,
      saveDirectory
    );
  }

  async downloadFile(file: StorageEntity, saveDirectory: string) {
    return this.apiService.downloadFile(file, saveDirectory);
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    const uploadUrl = await this.apiService.initializeResumableUpload(
      file,
      folderId
    );

    return this.apiService.uploadFile(uploadUrl, file);
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
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const body = mapPermissionRecipientToRequestBody(recipient, role);

    const transferOwnership = role === 'owner';
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

  async deletePermission(fileId: string, permissionId: string) {
    return this.apiService.deletePermission(fileId, permissionId);
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    const transferOwnership = role === 'owner';
    const body: UpdatePermissionRequestBody = {
      role: mapPermissionRoleToRoleRemote(role),
    };

    const response = await this.apiService.updatePermission(
      fileId,
      permissionId,
      body,
      transferOwnership,
      // sendNotificationEmail need to be set to true when transfer ownership
      transferOwnership
    );

    return mapPermissionRemoteToStoragePermission(response.data);
  }

  async updateFile(file: LocalFile, fileId: string) {
    const uploadUrl = await this.apiService.initializeResumableUpdate(
      file,
      fileId
    );

    return this.apiService.uploadFile(uploadUrl, file);
  }

  async getFileVersions(fileId: string) {
    const response = await this.apiService.getFileVersions(fileId);

    return response.data.revisions
      .reverse()
      .map((versionRemote) =>
        mapVersionRemoteToFileVersion(fileId, versionRemote)
      );
  }

  async downloadFileVersion(
    file: StorageEntity,
    versionId: string,
    saveDirectory: string
  ) {
    return this.apiService.downloadFileVersion(file, versionId, saveDirectory);
  }
}
