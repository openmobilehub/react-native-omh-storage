import type { CreateFileRequestBody } from './data/body/CreateFileRequestBody';
import { type FileListRemote } from './data/response/FileListRemote';
import type { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';

const FILES_PARTICLE = 'drive/v3/files';

export class GoogleDriveStorageApiService {
  private client: GoogleDriveStorageApiClient;

  private fieldsSelection =
    'id,name,createdTime,modifiedTime,parents,mimeType,fileExtension,size';
  private getFieldsParam = `files(${this.fieldsSelection})`;
  private allFieldsParam = '*';
  private selectedFieldsParam = this.fieldsSelection;

  private inFolderParam = (folderId: string) =>
    `'${folderId}' in parents and trashed = false`;

  private searchParam = (query: string) =>
    `name contains '${query}' and trashed = false`;

  constructor(apiClient: GoogleDriveStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string) {
    return await this.client.axiosClient.get<FileListRemote>(FILES_PARTICLE, {
      params: {
        q: this.inFolderParam(folderId),
        fields: this.getFieldsParam,
      },
    });
  }

  async getFileMetadata(fileId: string) {
    return this.client.axiosClient.get(`${FILES_PARTICLE}/${fileId}`, {
      params: {
        fields: this.allFieldsParam,
      },
    });
  }

  async search(query: string) {
    return await this.client.axiosClient.get<FileListRemote>(FILES_PARTICLE, {
      params: {
        q: this.searchParam(query),
        fields: this.getFieldsParam,
      },
    });
  }

  async createFileWithMimeType(body: CreateFileRequestBody) {
    return await this.client.axiosClient.post(FILES_PARTICLE, body, {
      params: {
        fields: this.selectedFieldsParam,
      },
    });
  }
}
