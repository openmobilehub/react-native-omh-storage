import {
  StorageEntityMetadata,
  UnsupportedOperationException,
  type IStorageClient,
  type LocalFile,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { OneDriveStorageApiClient } from './OneDriveStorageApiClient';
import { OneDriveStorageApiService } from './OneDriveStorageApiService';
import { OneDriveStorageRepository } from './OneDriveStorageRepository';

export class OneDriveStorageClient implements IStorageClient {
  private client: OneDriveStorageApiClient;
  private repository: OneDriveStorageRepository;

  constructor() {
    this.client = new OneDriveStorageApiClient();
    const service = new OneDriveStorageApiService(this.client);
    this.repository = new OneDriveStorageRepository(service);
  }

  readonly rootFolderId = ROOT_FOLDER;

  setAccessToken(accessToken: string) {
    this.client.setAccessToken(accessToken);
  }

  async listFiles(folderId: string) {
    return this.repository.listFiles(folderId);
  }

  getFileMetadata(_fileId: string): Promise<StorageEntityMetadata> {
    throw new UnsupportedOperationException();
  }

  search(_query: string): Promise<StorageEntity[]> {
    throw new UnsupportedOperationException();
  }

  createFileWithMimeType(
    _name: string,
    _mimeType: string,
    _parentId?: string
  ): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  createFileWithExtension(
    _name: string,
    _fileExtension: string,
    _parentId?: string
  ): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  localFileUpload(_file: LocalFile, _folderId: string): Promise<StorageEntity> {
    throw new UnsupportedOperationException();
  }

  deleteFile(_fileId: string): Promise<void> {
    throw new UnsupportedOperationException();
  }

  permanentlyDeleteFile(_fileId: string): Promise<void> {
    throw new UnsupportedOperationException();
  }
}
