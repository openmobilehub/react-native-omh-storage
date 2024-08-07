import {
  UnsupportedOperationException,
  type IStorageClient,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from '@openmobilehub/storage-core';
import { FileSystem as FS } from 'react-native-file-access';

import { ROOT_FOLDER } from './data/constants/constants';
import { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';
import { GoogleDriveStorageApiService } from './GoogleDriveStorageApiService';
import { GoogleDriveStorageRepository } from './GoogleDriveStorageRepository';

export class GoogleDriveStorageClient implements IStorageClient {
  private client: GoogleDriveStorageApiClient;
  private repository: GoogleDriveStorageRepository;

  constructor() {
    this.client = new GoogleDriveStorageApiClient();

    const service = new GoogleDriveStorageApiService(this.client);
    this.repository = new GoogleDriveStorageRepository(service);
  }

  readonly rootFolderId = ROOT_FOLDER;

  setAccessToken(accessToken: string) {
    this.client.setAccessToken(accessToken);
  }

  async listFiles(folderId: string) {
    return this.repository.listFiles(folderId);
  }

  async getFileMetadata(fileId: string) {
    return this.repository.getFileMetadata(fileId);
  }

  async search(query: string) {
    return this.repository.search(query);
  }

  async createFileWithExtension(): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  async createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId?: string
  ) {
    return this.repository.createFileWithMimeType(name, mimeType, parentId);
  }

  async exportFile(
    file: StorageEntity,
    mimeType: string,
    fileExtension: string,
    //FIXME: Temp solution until the bug with EventEmitter is fixed
    FileSystem: typeof FS
  ) {
    return this.repository.exportFile(
      file,
      mimeType,
      fileExtension,
      FileSystem
    );
  }

  async downloadFile(
    file: StorageEntity,
    //FIXME: Temp solution until the bug with EventEmitter is fixed
    FileSystem: typeof FS
  ) {
    return this.repository.downloadFile(file, FileSystem);
  }

  async localFileUpload(
    file: LocalFile,
    folderId: string,
    //FIXME: Temp solution until the bug with EventEmitter is fixed
    FileSystem: typeof FS
  ) {
    return this.repository.localFileUpload(file, folderId, FileSystem);
  }

  async deleteFile(fileId: string) {
    return this.repository.deleteFile(fileId);
  }

  async permanentlyDeleteFile(fileId: string) {
    return this.repository.permanentlyDeleteFile(fileId);
  }

  async getPermissions(fileId: string) {
    return this.repository.getPermissions(fileId);
  }

  async getWebUrl(fileId: string) {
    return this.repository.getWebUrl(fileId);
  }

  async createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    return this.repository.createPermission(
      fileId,
      role,
      recipient,
      sendNotificationEmail,
      emailMessage
    );
  }

  async deletePermission(fileId: string, permissionId: string) {
    return this.repository.deletePermission(fileId, permissionId);
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    return this.repository.updatePermission(fileId, permissionId, role);
  }
}
