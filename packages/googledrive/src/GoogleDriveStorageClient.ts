import type { IStorageClient } from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';
import { GoogleDriveStorageApiService } from './GoogleDriveStorageApiService';
import { GoogleDriveStorageRepository } from './GoogleDriveStorageRepository';

export class GoogleDriveStorageClient implements IStorageClient {
  private client: GoogleDriveStorageApiClient;
  private repository: GoogleDriveStorageRepository;

  constructor() {
    this.client = new GoogleDriveStorageApiClient();

    const service = new GoogleDriveStorageApiService(this.client);
    this.repository = new GoogleDriveStorageRepository(service);
  }

  readonly rootFolderId = ROOT_FOLDER;

  async setAccessToken(accessToken: string) {
    this.client.setAccessToken(accessToken);
  }

  async listFiles(folderId: string) {
    return this.repository.listFiles(folderId);
  }

  async getFileMetadata(fileId: string) {
    return this.repository.getFileMetadata(fileId);
  }
}
