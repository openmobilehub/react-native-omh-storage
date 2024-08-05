import { type FileListRemote } from './data/response/FileListRemote';
import type { PermissionListRemote } from './data/response/PermissionListRemote';
import type { WebUrlRemote } from './data/response/WebUrlRemote';
import type { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';

const FILES_PARTICLE = 'drive/v3/files';

export class GoogleDriveStorageApiService {
  private client: GoogleDriveStorageApiClient;

  private fieldsParam =
    'files(id,name,createdTime,modifiedTime,parents,mimeType,fileExtension,size)';

  private allFieldsParam = '*';
  private webViewLinkFieldParam = 'webViewLink';

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
        fields: this.fieldsParam,
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
        fields: this.fieldsParam,
      },
    });
  }

  async getPermissions(fileId: string) {
    return this.client.axiosClient.get<PermissionListRemote>(
      `${FILES_PARTICLE}/${fileId}/permissions`,
      {
        params: {
          fields: this.allFieldsParam,
        },
      }
    );
  }

  async getWebUrl(fileId: string) {
    return this.client.axiosClient.get<WebUrlRemote>(
      `${FILES_PARTICLE}/${fileId}`,
      {
        params: {
          fields: this.webViewLinkFieldParam,
        },
      }
    );
  }
}
