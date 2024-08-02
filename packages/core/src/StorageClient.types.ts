import type { StorageEntity } from './model/StorageEntity';
import type { StorageEntityMetadata } from './model/StorageEntityMetadata';
import type { StoragePermission } from './model/StoragePermission';

export interface IStorageClient {
  readonly rootFolderId: string;
  setAccessToken(accessToken: string): void;
  listFiles(folderId: string): Promise<StorageEntity[]>;
  getFileMetadata(fileId: string): Promise<StorageEntityMetadata>;
  search(query: string): Promise<StorageEntity[]>;
  getPermissions(fileId: string): Promise<StoragePermission[]>;
}
