import { ROOT_FOLDER } from './data/constants/constants';
import { GoogleStorageApiClient } from './GoogleStorageApiClient';
import { GoogleStorageApiService } from './GoogleStorageApiService';
import { GoogleStorageRepository } from './GoogleStorageRepository';
import type { StorageClient } from './model/StorageClient';

export class GoogleStorageClient implements StorageClient {
  private client: GoogleStorageApiClient;
  private repository: GoogleStorageRepository;

  constructor() {
    this.client = new GoogleStorageApiClient();

    const service = new GoogleStorageApiService(this.client);
    this.repository = new GoogleStorageRepository(service);
  }

  readonly rootFolderId = ROOT_FOLDER;

  setAccessToken(accessToken: string) {
    this.client.setAccessToken(accessToken);
  }

  listFiles(folderId: string) {
    return this.repository.listFiles(folderId);
  }
}
