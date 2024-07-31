import type { StorageEntity } from './model/StorageEntity';
import type { StorageEntityMetadata } from './model/StorageEntityMetadata';

export interface IStorageClient {
  readonly rootFolderId: string;
  setAccessToken(accessToken: string): void;
  listFiles(fileId: string): Promise<StorageEntity[]>;
  getFileMetadata(fileId: string): Promise<StorageEntityMetadata>;
}
