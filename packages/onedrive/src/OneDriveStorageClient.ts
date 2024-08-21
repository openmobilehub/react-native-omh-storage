import {
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
