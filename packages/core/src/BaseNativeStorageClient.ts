import { FileSystem } from 'react-native-file-access';

import { mapNativeStorageEntity } from './mappers/mapNativeStorageEntity';
import type {
  Permission,
  PermissionRecipient,
  PermissionRole,
  StorageEntity,
  StorageEntityMetadata,
} from './model';
import { UnsupportedOperationException } from './model';
import type { FileVersion } from './model/FileVersion';
import type { NativeStorageClient } from './StorageClient.nativeTypes';
import type { IStorageClient, LocalFile } from './StorageClient.types';
import { mapNativeException } from './utils/errorHandling';

export abstract class BaseNativeStorageClient implements IStorageClient {
  nativeStorageModule: NativeStorageClient;
  readonly rootFolderId: string;

  constructor(nativeStorageModule: NativeStorageClient, rootFolderId: string) {
    this.nativeStorageModule = nativeStorageModule;
    this.rootFolderId = rootFolderId;

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

  createFolder(_name: string, _parentId?: string): Promise<StorageEntity> {
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

  getPermissions(_fileId: string): Promise<Permission[]> {
    throw new UnsupportedOperationException();
  }

  getWebUrl(_fileId: string): Promise<string | undefined> {
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
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async downloadFile(file: StorageEntity, saveDir: string) {
    try {
      const result = await this.nativeStorageModule.downloadFile(file.id);

      const filePath = `${saveDir}/${file.name}`;

      await FileSystem.writeFile(filePath, result, 'base64');
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  updateFile(_file: LocalFile, _fileId: string): Promise<StorageEntity> {
    throw new Error('Method not implemented.');
  }

  getFileVersions(_fileId: string): Promise<FileVersion[]> {
    throw new Error('Method not implemented.');
  }

  downloadFileVersion(_file: StorageEntity, _versionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
