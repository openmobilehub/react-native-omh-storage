import type { StorageEntity } from './StorageEntity';

export interface StorageClient {
  readonly rootFolderId: string;
  setAccessToken(accessToken: string): void;
  listFiles(folderId: string): Promise<StorageEntity[]>;
}
