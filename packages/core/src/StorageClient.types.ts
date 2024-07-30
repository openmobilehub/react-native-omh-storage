import type { StorageEntity } from './model/StorageEntity';

export interface StorageClient {
  readonly rootFolderId: string;
  setAccessToken(accessToken: string): void;
  listFiles(folderId: string): Promise<StorageEntity[]>;
}
