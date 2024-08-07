import { type Permission, type PermissionRole } from './model/Permission';
import { type PermissionRecipient } from './model/PermissionRecipient';
import type { StorageEntity } from './model/StorageEntity';
import type { StorageEntityMetadata } from './model/StorageEntityMetadata';

export type LocalFile = {
  name: string;
  size: number;
  type: string;
  uri: string;
};

export interface IStorageClient {
  readonly rootFolderId: string;
  setAccessToken(accessToken: string): void;
  listFiles(folderId: string): Promise<StorageEntity[]>;
  getFileMetadata(fileId: string): Promise<StorageEntityMetadata>;
  search(query: string): Promise<StorageEntity[]>;
  createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId?: string
  ): Promise<StorageEntity>;
  createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId?: string
  ): Promise<StorageEntity>;
  exportFile(
    file: StorageEntity,
    mimeType: string,
    fileExtension: string,
    //FIXME: Temp solution until the bug with EventEmitter is fixed
    FileSystem: any
  ): Promise<any>;
  downloadFile(
    file: StorageEntity,
    //FIXME: Temp solution until the bug with EventEmitter is fixed
    FileSystem: any
  ): Promise<any>;
  localFileUpload(
    file: LocalFile,
    folderId: string,
    //FIXME: Temp solution until the bug with EventEmitter is fixed
    FileSystem: any
  ): Promise<StorageEntity>;
  deleteFile(fileId: string): Promise<void>;
  permanentlyDeleteFile(fileId: string): Promise<void>;
  getPermissions(fileId: string): Promise<Permission[]>;
  getWebUrl(fileId: string): Promise<string | undefined>;
  createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ): Promise<Permission | undefined>;
  deletePermission(fileId: string, permissionId: string): Promise<void>;
  updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ): Promise<Permission | undefined>;
}
