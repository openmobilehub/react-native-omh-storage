import {
  Permission,
  UnsupportedOperationException,
  type IStorageClient,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
  type StorageAuthClient,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { DropboxStorageApiClient } from './DropboxStorageApiClient';
import { DropboxStorageApiService } from './DropboxStorageApiService';
import { DropboxStorageRepository } from './DropboxStorageStorageRepository';

export class DropboxStorageClient implements IStorageClient {
  private client: DropboxStorageApiClient;
  private repository: DropboxStorageRepository;

  constructor(authClient: StorageAuthClient) {
    this.client = new DropboxStorageApiClient(authClient);
    const service = new DropboxStorageApiService(this.client, authClient);
    this.repository = new DropboxStorageRepository(service);
  }

  readonly rootFolderId = ROOT_FOLDER;

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
    _fileId: string,
    _role: PermissionRole,
    _recipient: PermissionRecipient,
    _sendNotificationEmail: boolean,
    _emailMessage?: string
  ): Promise<Permission | undefined> {
    throw new UnsupportedOperationException();
  }

  deletePermission(_fileId: string, _permissionId: string): Promise<void> {
    throw new UnsupportedOperationException();
  }

  getPermissions(_fileId: string): Promise<Permission[]> {
    throw new UnsupportedOperationException();
  }

  getWebUrl(_fileId: string): Promise<string | undefined> {
    throw new UnsupportedOperationException();
  }

  updatePermission(
    _fileId: string,
    _permissionId: string,
    _role: PermissionRole
  ): Promise<Permission | undefined> {
    throw new UnsupportedOperationException();
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
