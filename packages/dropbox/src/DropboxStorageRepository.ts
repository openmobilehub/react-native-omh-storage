import {
  ApiException,
  StorageEntityMetadata,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
} from '@openmobilehub/storage-core';
import type { StorageEntity } from '@openmobilehub/storage-core';

import { mapPermissionRoleToAccessLevel } from './data/mappers/mapAccessLevelToPermissionRole';
import { mapMetadataToStorageEntity } from './data/mappers/mapFileRemoteToStorageEntity';
import { mapListMembersResponseToPermissions } from './data/mappers/mapListMembersResponseToPermissions';
import { mapPermissionIdToMemberSelector } from './data/mappers/mapPermissionIdToMemberSelector';
import { mapPermissionRecipientToMemberSelector } from './data/mappers/mapPermissionRecipientToMemberSelector';
import type { FolderMetadata } from './data/response/Metadata';
import type { DropboxStorageApiService } from './DropboxStorageApiService';

const CHECK_JOB_STATUS_RETRY_TIMES = 10;

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

  async downloadFile(file: StorageEntity) {
    return this.apiService.downloadFile(file);
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    const response = await this.apiService.localFileUpload(file, folderId);

    if (!response) {
      throw new Error('Upload failed, no response received');
    }

    return response;
  }

  async createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const folderMetadata = await this.isFolder(fileId);

    if (folderMetadata) {
      const sharedFolderId = folderMetadata.sharing_info?.shared_folder_id;
      if (!sharedFolderId) {
        return this.shareFolderAndCreatePermission(
          fileId,
          role,
          recipient,
          sendNotificationEmail,
          emailMessage
        );
      }
      return this.createFolderPermission(
        sharedFolderId,
        role,
        recipient,
        sendNotificationEmail,
        emailMessage
      );
    } else {
      return this.createFilePermission(
        fileId,
        role,
        recipient,
        sendNotificationEmail,
        emailMessage
      );
    }
  }

  private async createFilePermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const body = {
      access_level: mapPermissionRoleToAccessLevel(role),
      custom_message: emailMessage,
      file: fileId,
      members: [mapPermissionRecipientToMemberSelector(recipient)],
      quiet: sendNotificationEmail,
    };

    await this.apiService.addFileMember(body);
  }

  private async createFolderPermission(
    sharedFolderId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const body = {
      custom_message: emailMessage,
      shared_folder_id: sharedFolderId,
      members: [
        {
          access_level: mapPermissionRoleToAccessLevel(role),
          member: mapPermissionRecipientToMemberSelector(recipient),
        },
      ],
      quiet: sendNotificationEmail,
    };

    await this.apiService.addFolderMember(body);
  }

  private async shareFolderAndCreatePermission(
    folderId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    const sharedFolderId = await this.shareFolder(folderId);

    await this.createFolderPermission(
      sharedFolderId,
      role,
      recipient,
      sendNotificationEmail,
      emailMessage
    );
  }

  private async shareFolder(folderId: string) {
    const shareResponse = await this.apiService.shareFolder(folderId);

    switch (shareResponse.data['.tag']) {
      case 'complete':
        return shareResponse.data.shared_folder_id;
      case 'async_job_id':
        return this.checkShareJobStatus(
          shareResponse.data.async_job_id,
          CHECK_JOB_STATUS_RETRY_TIMES
        );
    }
  }

  private async checkShareJobStatus(
    asyncJobIdValue: string,
    retries: number
  ): Promise<string> {
    const response = await this.apiService.checkShareJobStatus(asyncJobIdValue);
    switch (response.data?.['.tag']) {
      case 'complete':
        return response.data.shared_folder_idString;
      case 'in_progress':
        if (retries > 0) {
          return await this.checkShareJobStatus(asyncJobIdValue, retries - 1);
        } else {
          throw new ApiException(
            'Sharing folder job did not finish in expected time'
          );
        }
    }
  }

  async getWebUrl(fileId: string) {
    const folderMetadata = await this.isFolder(fileId);

    if (folderMetadata) {
      const sharedFolderId = folderMetadata.sharing_info?.shared_folder_id;
      if (!sharedFolderId) {
        return undefined;
      }
      return this.getFolderWebUrl(sharedFolderId);
    } else {
      return this.getFileWebUrl(fileId);
    }
  }

  private async getFileWebUrl(fileId: string) {
    const response = await this.apiService.getFileSharingMetadata(fileId);

    return response.data.preview_url;
  }

  private async getFolderWebUrl(sharedFolderId: string) {
    const response =
      await this.apiService.getFolderSharingMetadata(sharedFolderId);

    return response.data.preview_url;
  }

  async getPermissions(fileId: string) {
    const folderMetadata = await this.isFolder(fileId);

    if (folderMetadata) {
      const sharedFolderId = folderMetadata.sharing_info?.shared_folder_id;
      if (!sharedFolderId) {
        return [];
      }
      return this.getFolderPermissions(sharedFolderId);
    } else {
      return this.getFilePermissions(fileId);
    }
  }

  private async getFolderPermissions(sharedFolderId: string) {
    const response = await this.apiService.getFolderPermissions({
      shared_folder_id: sharedFolderId,
    });

    return mapListMembersResponseToPermissions(response.data);
  }

  private async getFilePermissions(fileId: string) {
    const response = await this.apiService.getFilePermissions({
      file: fileId,
      include_inherited: true,
    });

    return mapListMembersResponseToPermissions(response.data);
  }

  async deletePermission(fileId: string, permissionId: string) {
    const folderMetadata = await this.isFolder(fileId);
    if (folderMetadata) {
      const sharedFolderId = folderMetadata.sharing_info?.shared_folder_id;
      if (!sharedFolderId) {
        throw new ApiException('This is not a shared folder');
      }
      return this.deleteFolderPermission(sharedFolderId, permissionId);
    } else {
      return this.deleteFilePermission(fileId, permissionId);
    }
  }

  private async deleteFolderPermission(
    sharedFolderId: string,
    permissionId: string
  ) {
    await this.apiService.removeFolderMember({
      shared_folder_id: sharedFolderId,
      member: mapPermissionIdToMemberSelector(permissionId),
      leave_a_copy: false,
    });
  }

  private async deleteFilePermission(fileId: string, permissionId: string) {
    await this.apiService.removeFileMember({
      file: fileId,
      member: mapPermissionIdToMemberSelector(permissionId),
    });
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    const folderMetadata = await this.isFolder(fileId);
    if (folderMetadata) {
      const sharedFolderId = folderMetadata.sharing_info?.shared_folder_id;
      if (!sharedFolderId) {
        throw new ApiException('This is not a shared folder');
      }
      return this.updateFolderPermission(sharedFolderId, permissionId, role);
    } else {
      return this.updateFilePermission(fileId, permissionId, role);
    }
  }

  private async updateFolderPermission(
    sharedFolderId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    await this.apiService.updateFolderMember({
      access_level: mapPermissionRoleToAccessLevel(role),
      shared_folder_id: sharedFolderId,
      member: mapPermissionIdToMemberSelector(permissionId),
    });
  }

  private async updateFilePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    await this.apiService.updateFileMember({
      access_level: mapPermissionRoleToAccessLevel(role),
      file: fileId,
      member: mapPermissionIdToMemberSelector(permissionId),
    });
  }

  private async isFolder(fileId: string) {
    const response = await this.apiService.getFileMetadata(fileId);

    return response.data?.['.tag'] === 'folder'
      ? (response.data as FolderMetadata)
      : undefined;
  }
}