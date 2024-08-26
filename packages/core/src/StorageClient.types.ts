import type { FileVersion } from './model/FileVersion';
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
  listFiles(folderId: string): Promise<StorageEntity[]>;
  getFileMetadata(fileId: string): Promise<StorageEntityMetadata>;
  search(query: string): Promise<StorageEntity[]>;
  createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId?: string
  ): Promise<StorageEntity | undefined>;
  createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId?: string
  ): Promise<StorageEntity | undefined>;
  createFolder(
    name: string,
    parentId?: string
  ): Promise<StorageEntity | undefined>;
  exportFile(
    file: StorageEntity,
    mimeType: string,
    fileExtension: string,
    saveDirectory: string
  ): Promise<void>;
  downloadFile(file: StorageEntity, saveDirectory: string): Promise<void>;
  localFileUpload(file: LocalFile, folderId: string): Promise<StorageEntity>;
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
  ): Promise<Permission | void>;
  deletePermission(fileId: string, permissionId: string): Promise<void>;
  updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ): Promise<Permission | void>;
  updateFile(file: LocalFile, fileId: string): Promise<StorageEntity>;
  getFileVersions(fileId: string): Promise<FileVersion[]>;
  downloadFileVersion(
    file: StorageEntity,
    versionId: string,
    saveDirectory: string
  ): Promise<void>;
}

export interface IStorageAuthClient {
  getAccessToken(): Promise<string | undefined>;
}
