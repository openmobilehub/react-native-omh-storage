import {
  ApiException,
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
import { mapVersionRemoteToFileVersion } from './data/mappers/mapVersionRemoteToFileVersion';
import type { DriveItem } from './data/response/DriveItem';
import type { OneDriveStorageApiService } from './OneDriveStorageApiService';

const PRECONDITION_ERROR_STATUS_CODE = 412;

export class OneDriveStorageRepository {
  private apiService: OneDriveStorageApiService;

  constructor(apiService: OneDriveStorageApiService) {
    this.apiService = apiService;
  }

  async listFiles(folderId: string) {
    const response = await this.apiService.listFiles(folderId);

    return response.data.value.map(mapDriveItemToStorageEntity);
  }

  async search(query: string) {
    const response = await this.apiService.search(query);

    return response.data.value.map(mapDriveItemToStorageEntity);
  }

  async downloadFile(file: StorageEntity, saveDirectory: string) {
    const downloadUrl = await this.apiService.getDownloadFileUrl(file.id);

    return this.apiService.downloadFile(downloadUrl, file.name, saveDirectory);
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    let driveItem: DriveItem;

    if (file.size < 1) {
      driveItem = await this.apiService.uploadSmallFile(file, folderId);
    } else {
      const uploadUrl = await this.apiService.initializeResumableUpload(
        file,
        folderId
      );

      driveItem = await this.apiService.resumableUploadFile(uploadUrl, file);
    }

    return mapDriveItemToStorageEntity(driveItem);
  }

  async getFileMetadata(fileId: string) {
    const response = await this.apiService.getFileMetadata(fileId);

    const storageEntity = mapDriveItemToStorageEntity(response.data);

    return new StorageEntityMetadata({
      entity: storageEntity,
      originalMetadata: response.data,
    });
  }

  async deleteFile(fileId: string) {
    return this.apiService.deleteFile(fileId);
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

  async getFileVersions(fileId: string) {
    const response = await this.apiService.getFileVersions(fileId);

    return response.data.value.map((versionRemote) =>
      mapVersionRemoteToFileVersion(versionRemote, fileId)
    );
  }

  async downloadFileVersion(
    file: StorageEntity,
    versionId: string,
    saveDirectory: string
  ) {
    const downloadUrl = await this.apiService.getDownloadVersionFileUrl(
      file.id,
      versionId
    );

    return this.apiService.downloadFile(downloadUrl, file.name, saveDirectory);
  }

  private async renameFile(
    fileId: string,
    fileName: string,
    retry: boolean
  ): Promise<StorageEntity> {
    try {
      const response = await this.apiService.updateFileMetadata(fileId, {
        name: fileName,
      });

      return mapDriveItemToStorageEntity(response.data);
    } catch (error) {
      // This is a workaround for the OneDrive API issue where the file name is not updated
      // when uploading a new file version. The reason is related to the race condition when
      // uploading a new file version and renaming the file at the same time.
      if (
        error instanceof ApiException &&
        error.code === PRECONDITION_ERROR_STATUS_CODE &&
        retry
      ) {
        return this.renameFile(fileId, fileName, false);
      } else {
        throw error;
      }
    }
  }

  async updateFile(file: LocalFile, fileId: string) {
    let uploadedDriveItem: DriveItem;
    if (file.size < 1) {
      uploadedDriveItem = await this.apiService.updateSmallFile(file, fileId);
    } else {
      const uploadUrl = await this.apiService.initializeResumableUpdate(fileId);

      uploadedDriveItem = await this.apiService.resumableUploadFile(
        uploadUrl,
        file
      );
    }

    // By default, the file name is not updated when uploading a new file version.
    if (uploadedDriveItem?.name === file.name) {
      return mapDriveItemToStorageEntity(uploadedDriveItem);
    }

    const renameResponse = await this.renameFile(fileId, file.name, true);

    return mapDriveItemToStorageEntity(renameResponse);
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
