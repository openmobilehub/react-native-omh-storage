import { type FileListRemote } from './data/response/FileListRemote';
import type { GoogleStorageApiClient } from './GoogleStorageApiClient';

const FILES_PARTICLE = 'drive/v3/files';

export class GoogleStorageApiService {
  private client: GoogleStorageApiClient;

  private fieldsParam =
    'files(id,name,createdTime,modifiedTime,parents,mimeType,fileExtension,size)';

  private qParam = (folderId: string) =>
    `'${folderId}' in parents and trashed = false`;

  constructor(apiClient: GoogleStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string) {
    return await this.client.axiosClient.get<FileListRemote>(FILES_PARTICLE, {
      params: {
        q: this.qParam(folderId),
        fields: this.fieldsParam,
      },
    });
  }
}
