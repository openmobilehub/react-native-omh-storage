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
}

export default TurboModuleRegistry.getEnforcing<Spec>('StorageOneDriveModule');
