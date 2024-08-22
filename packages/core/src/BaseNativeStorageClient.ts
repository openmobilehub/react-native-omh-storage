import type { FetchResult } from 'react-native-file-access';

import { mapNativeStorageEntity } from './mappers/mapNativeStorageEntity';
import {
  UnsupportedOperationException,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from './model';
import type { NativeStorageClient } from './StorageClient.nativeTypes';
import type { IStorageClient, LocalFile } from './StorageClient.types';
import { mapNativeException } from './utils/errorHandling';

export abstract class BaseNativeStorageClient implements IStorageClient {
  nativeStorageModule: NativeStorageClient;
  readonly rootFolderId: string;

  //TODO: [Fallback] Remove fallbackClient
  fallbackClient: IStorageClient;

  constructor(
    nativeStorageModule: NativeStorageClient,
    rootFolderId: string,
    fallbackClient: IStorageClient
  ) {
    this.nativeStorageModule = nativeStorageModule;
    this.rootFolderId = rootFolderId;

    this.fallbackClient = fallbackClient;

    this.nativeStorageModule.initializeStorageClient();
  }

  async listFiles(folderId: string): Promise<StorageEntity[]> {
    try {
      const nativeStorageEntities =
        await this.nativeStorageModule.listFiles(folderId);

      return nativeStorageEntities.map(mapNativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async getFileMetadata(fileId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.getFileMetadata(fileId);
  }

  async search(query: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.search(query);
  }

  async createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId?: string
  ) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.createFileWithMimeType(name, mimeType, parentId);
  }

  async createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId?: string
  ) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.createFileWithExtension(
      name,
      fileExtension,
      parentId
    );
  }

  async createFolder(name: string, parentId?: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.createFolder(name, parentId);
  }

  async localFileUpload(
    _file: LocalFile,
    _folderId: string
  ): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  async deleteFile(fileId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.deleteFile(fileId);
  }

  async permanentlyDeleteFile(fileId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.permanentlyDeleteFile(fileId);
  }

  async getPermissions(fileId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.getPermissions(fileId);
  }

  async getWebUrl(fileId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.getWebUrl(fileId);
  }

  async createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.createPermission(
      fileId,
      role,
      recipient,
      sendNotificationEmail,
      emailMessage
    );
  }

  async deletePermission(fileId: string, permissionId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.deletePermission(fileId, permissionId);
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.updatePermission(fileId, permissionId, role);
  }

  async exportFile(
    _file: StorageEntity,
    _mimeType: string,
    _fileExtension: string
  ): Promise<FetchResult> {
    throw new UnsupportedOperationException();
  }

  async downloadFile(_file: StorageEntity): Promise<FetchResult> {
    throw new UnsupportedOperationException();
  }

  async updateFile(_file: LocalFile, _fileId: string): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  async getFileVersions(fileId: string) {
    //TODO: [Fallback] Replace with native implementation
    return this.fallbackClient.getFileVersions(fileId);
  }

  async downloadFileVersion(
    _file: StorageEntity,
    _versionId: string
  ): Promise<FetchResult> {
    throw new UnsupportedOperationException();
  }
}
