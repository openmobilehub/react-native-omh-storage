import {
  Permission,
  StorageEntityMetadata,
  UnsupportedOperationException,
  type IStorageAuthClient,
  type IStorageClient,
  type LocalFile,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from '@openmobilehub/storage-core';
import type { FileVersion } from 'packages/core/src/model/FileVersion';
import type { FetchResult } from 'react-native-file-access';

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

  getFileMetadata(_fileId: string): Promise<StorageEntityMetadata> {
    throw new UnsupportedOperationException();
  }

  search(_query: string): Promise<StorageEntity[]> {
    throw new UnsupportedOperationException();
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

  async downloadFile(file: StorageEntity) {
    return this.repository.downloadFile(file);
  }

  updateFile(_file: LocalFile, _fileId: string): Promise<StorageEntity> {
    throw new Error('Method not implemented.');
  }

  getFileVersions(_fileId: string): Promise<FileVersion[]> {
    throw new Error('Method not implemented.');
  }

  downloadFileVersion(
    _file: StorageEntity,
    _versionId: string
  ): Promise<FetchResult> {
    throw new Error('Method not implemented.');
  }
}
