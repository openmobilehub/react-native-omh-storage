import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

type NativeStorageEntity = {
  type: string;
  id: string;
  name: string;
  createdTime?: Double;
  modifiedTime?: Double;
  parentId?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
};

type NativeFileVersion = {
  fileId: string;
  versionId: string;
  lastModified: Double;
};

export type NativeStorageEntityMetadata = {
  entity: NativeStorageEntity;
  originalMetadata: string;
};

export type NativePermission = {
  type: string;
  id: string;
  role: string;
  isInherited?: boolean;
  userId?: string;
  displayName?: string;
  emailAddress?: string;
  expirationTime?: Double;
  deleted?: boolean;
  photoLink?: string;
  pendingOwner?: boolean;
  groupId?: string;
  domain?: string;
  deviceId?: string;
  applicationId?: string;
};

export interface Spec extends TurboModule {
  initializeStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
  getFileMetadata(fileId: string): Promise<NativeStorageEntityMetadata>;
  uploadFile(
    fileName: string,
    uri: string,
    folderId: string
  ): Promise<NativeStorageEntity>;
  search(query: string): Promise<NativeStorageEntity[]>;
  updateFile(
    fileName: string,
    uri: string,
    fileId: string
  ): Promise<NativeStorageEntity>;
  downloadFile(fileId: string, filePath: string): Promise<void>;
  exportFile(fileId: string, mimeType: string, filePath: string): Promise<void>;
  getFileVersions(fileId: string): Promise<NativeFileVersion[]>;
  downloadFileVersion(
    fileId: string,
    versionId: string,
    filePath: string
  ): Promise<void>;
  createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId: string
  ): Promise<NativeStorageEntity> | undefined;
  createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId: string
  ): Promise<NativeStorageEntity | undefined>;
  createFolder(
    name: string,
    parentId: string
  ): Promise<NativeStorageEntity | undefined>;
  getPermissions(fileId: string): Promise<NativePermission[]>;
  getWebUrl(fileId: string): Promise<string>;
  createPermission(
    fileId: string,
    role: string,
    sendNotificationEmail: boolean,
    recipientType: string,
    emailMessage?: string,
    recipientEmail?: string,
    recipientDomain?: string,
    recipientObjectId?: string,
    recipientAlias?: string
  ): Promise<NativePermission | undefined>;
  deletePermission(fileId: string, permissionId: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('StorageDropboxModule');
