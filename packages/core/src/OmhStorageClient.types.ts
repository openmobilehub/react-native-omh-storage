import type { OmhStorageEntity } from './model/OmhStorageEntity';

export interface IOmhStorageClient {
  readonly rootFolderId: string;
  setAccessToken(accessToken: string): void;
  listFiles(folderId: string): Promise<OmhStorageEntity[]>;
}
