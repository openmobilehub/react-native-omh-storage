import { mapFileNativeToStorageEntity } from './mappers/mapFileNativeToStorageEntity';
import type {
  Permission,
  PermissionRecipient,
  PermissionRole,
  StorageEntity,
  StorageEntityMetadata,
} from './model';
import { UnsupportedOperationException } from './model';
import type { NativeStorageClient } from './StorageClient.nativeTypes';
import type { IStorageClient, LocalFile } from './StorageClient.types';

export abstract class BaseNativeStorageClient implements IStorageClient {
  nativeStorageModule: NativeStorageClient;
  readonly rootFolderId: string;

  constructor(nativeStorageModule: NativeStorageClient, rootFolderId: string) {
    this.nativeStorageModule = nativeStorageModule;
    this.rootFolderId = rootFolderId;

    this.nativeStorageModule.initializeStorageClient();
  }

  setAccessToken(_accessToken: string): void {
    // throw new UnsupportedOperationException();
    // This method is not implemented in the base class, so it should be implemented in the derived class.
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

  async listFiles(folderId: string): Promise<StorageEntity[]> {
    const nativeStorageEntities =
      await this.nativeStorageModule.listFiles(folderId);
    console.log(
      '🚀 ~ BaseNativeStorageClient ~ listFiles ~ nativeStorageEntities:',
      nativeStorageEntities
    );

    return nativeStorageEntities.map(mapFileNativeToStorageEntity);
  }
}
