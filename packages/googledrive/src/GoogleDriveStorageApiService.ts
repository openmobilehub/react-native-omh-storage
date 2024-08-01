import type { LocalFile } from '@openmobilehub/storage-core';

import { type FileListRemote } from './data/response/FileListRemote';
import type { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';
import { generateUniqeId } from './utils/generateUniqueId';

const FILES_PARTICLE = 'drive/v3/files';
const UPLOAD_PARTICLE = 'upload/drive/v3/files';

export class GoogleDriveStorageApiService {
  private client: GoogleDriveStorageApiClient;

  private fieldsParam =
    'files(id,name,createdTime,modifiedTime,parents,mimeType,fileExtension,size)';

  private allFieldsParam = '*';

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

  async localFileUpload(file: LocalFile, folderId: string) {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId],
    };
    const boundaryString = generateUniqeId();

    const body =
      `--${boundaryString}\r\n` +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      `${JSON.stringify(metadata)}\r\n` +
      `--${boundaryString}\r\n` +
      `Content-Type: ${file.type}\r\n` +
      'Content-Transfer-Encoding: base64\r\n\r\n' +
      `${file.base64Data}\r\n` +
      `--${boundaryString}--`;

    try {
      const response = await this.client.axiosClient.post(
        UPLOAD_PARTICLE,
        body,
        {
          headers: {
            'Content-Type': `multipart/related; boundary=${boundaryString}`,
          },
          params: {
            uploadType: 'multipart',
            fields:
              'id,name,createdTime,modifiedTime,parents,mimeType,fileExtension,size',
          },
        }
      );

      if (response?.status === 200) {
        return response.data;
      } else {
        throw new Error(`Upload failed with status ${response?.status}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}
