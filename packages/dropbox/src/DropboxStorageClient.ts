import {
  StorageEntityMetadata,
  UnsupportedOperationException,
  type IStorageClient,
  type LocalFile,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { DropboxStorageApiClient } from './DropboxStorageApiClient';
import { DropboxStorageApiService } from './DropboxStorageApiService';
import { DropboxStorageRepository } from './DropboxStorageStorageRepository';

export class DropboxStorageClient implements IStorageClient {
  private client: DropboxStorageApiClient;
  private repository: DropboxStorageRepository;

  constructor() {
    this.client = new DropboxStorageApiClient();
    const service = new DropboxStorageApiService(this.client);
    this.repository = new DropboxStorageRepository(service);
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

  async search(query: string): Promise<StorageEntity[]> {
    return this.repository.searchFiles(query);
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
