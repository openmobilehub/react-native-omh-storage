import type { Permission } from './model/Permission';
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
  localFileUpload(file: LocalFile, folderId: string): Promise<StorageEntity>;
  getPermissions(fileId: string): Promise<Permission[]>;
  getWebUrl(fileId: string): Promise<string | undefined>;
}
