import {
  Permission,
  UnsupportedOperationException,
  type IStorageAuthClient,
  type IStorageClient,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import {
  OneDriveStorageApiClient,
  OneDriveStorageApiClientNoAuth,
} from './OneDriveStorageApiClient';
import { OneDriveStorageApiService } from './OneDriveStorageApiService';
import { OneDriveStorageRepository } from './OneDriveStorageRepository';

export class OneDriveStorageClient implements IStorageClient {
  private client: OneDriveStorageApiClient;
  private clientNoAuth: OneDriveStorageApiClientNoAuth;
  private repository: OneDriveStorageRepository;

  constructor(authClient: IStorageAuthClient) {
    this.client = new OneDriveStorageApiClient(authClient);
    this.clientNoAuth = new OneDriveStorageApiClientNoAuth();

    const service = new OneDriveStorageApiService(
      this.client,
      this.clientNoAuth
    );

    this.repository = new OneDriveStorageRepository(service);
  }

  readonly rootFolderId = ROOT_FOLDER;

  async listFiles(folderId: string) {
    return this.repository.listFiles(folderId);
  }

  getFileMetadata(fileId: string) {
    return this.repository.getFileMetadata(fileId);
  }

  async search(query: string) {
    return this.repository.search(query);
  }

  createFileWithMimeType(
    _name: string,
    _mimeType: string,
    _parentId?: string
  ): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  async createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId?: string
  ): Promise<StorageEntity> {
    return this.repository.createFileWithExtension(
      name,
      fileExtension,
      parentId
    );
  }

  async createFolder(name: string, parentId?: string): Promise<StorageEntity> {
    return this.repository.createFolder(name, parentId);
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    return this.repository.localFileUpload(file, folderId);
  }

  async deleteFile(fileId: string) {
    return this.repository.deleteFile(fileId);
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

  async downloadFile(file: StorageEntity) {
    return this.repository.downloadFile(file);
  }

  async updateFile(file: LocalFile, fileId: string) {
    return this.repository.updateFile(file, fileId);
  }

  async getFileVersions(fileId: string) {
    return this.repository.getFileVersions(fileId);
  }

  async downloadFileVersion(file: StorageEntity, versionId: string) {
    return this.repository.downloadFileVersion(file, versionId);
  }
}
