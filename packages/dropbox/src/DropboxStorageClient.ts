import {
  Permission,
  UnsupportedOperationException,
  type IStorageClient,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { DropboxStorageApiClient } from './DropboxStorageApiClient';
import { DropboxStorageApiService } from './DropboxStorageApiService';
import { DropboxStorageRepository } from './DropboxStorageRepository';

export class DropboxStorageClient implements IStorageClient {
  private client: DropboxStorageApiClient;
  private repository: DropboxStorageRepository;

  constructor() {
    this.client = new DropboxStorageApiClient();
    const service = new DropboxStorageApiService(this.client);
    this.repository = new DropboxStorageRepository(service);
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

  async search(query: string): Promise<StorageEntity[]> {
    return this.repository.searchFiles(query);
  }

  createFileWithMimeType(
    _name: string,
    _mimeType: string,
    _parentId?: string
  ): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  createFileWithExtension(
    _name: string,
    _fileExtension: string,
    _parentId?: string
  ): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    return this.repository.localFileUpload(file, folderId);
  }

  async deleteFile(fileId: string) {
    return this.repository.deleteFile(fileId);
  }

  async permanentlyDeleteFile() {
    throw new UnsupportedOperationException();
  }

  createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ): Promise<Permission | void> {
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

  async getPermissions(fileId: string) {
    return this.repository.getPermissions(fileId);
  }

  async getWebUrl(fileId: string) {
    return this.repository.getWebUrl(fileId);
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    return this.repository.updatePermission(fileId, permissionId, role);
  }

  exportFile(
    _file: StorageEntity,
    _mimeType: string,
    _fileExtension: string
  ): Promise<any> {
    throw new UnsupportedOperationException();
  }

  async downloadFile(file: StorageEntity) {
    return this.repository.downloadFile(file);
  }
}
