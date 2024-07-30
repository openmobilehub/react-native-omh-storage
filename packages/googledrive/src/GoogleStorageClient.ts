import type { IOmhStorageClient } from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { GoogleStorageApiClient } from './GoogleStorageApiClient';
import { GoogleStorageApiService } from './GoogleStorageApiService';
import { GoogleStorageRepository } from './GoogleStorageRepository';

export class GoogleStorageClient implements IOmhStorageClient {
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
