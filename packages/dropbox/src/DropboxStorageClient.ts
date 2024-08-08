import {
  Permission,
  StorageEntityMetadata,
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
import { DropboxStorageRepository } from './DropboxStorageStorageRepository';

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

  getFileMetadata(_fileId: string): Promise<StorageEntityMetadata> {
    throw new UnsupportedOperationException();
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

  localFileUpload(_file: LocalFile, _folderId: string): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  deleteFile(_fileId: string): Promise<void> {
    throw new UnsupportedOperationException();
  }

  permanentlyDeleteFile(_fileId: string): Promise<void> {
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

  downloadFile(_file: StorageEntity): Promise<any> {
    throw new UnsupportedOperationException();
  }
}
