import {
  ApiException,
  StorageEntity,
  type LocalFile,
} from '@openmobilehub/storage-core';
import { Dirs, FileSystem as FS } from 'react-native-file-access';

import type { CommonRequestBody } from './data/body/CommonRequestBody';
import type { CreateFileRequestBody } from './data/body/CreateFileRequestBody';
import type { CreatePermissionRequestBody } from './data/body/CreatePermissionRequestBody';
import type { UpdatePermissionRequestBody } from './data/body/UpdatePermissionRequestBody';
import { BASE_URL } from './data/constants/constants';
import { type FileListRemote } from './data/response/FileListRemote';
import type { PermissionListRemote } from './data/response/PermissionListRemote';
import type { PermissionRemote } from './data/response/PermissionRemote';
import type { WebUrlRemote } from './data/response/WebUrlRemote';
import type { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';

const FILES_PARTICLE = 'drive/v3/files';
const UPLOAD_PARTICLE = 'upload/drive/v3/files';
const UPLOAD_CHUNK_SIZE = 1024 * 1024 * 10; // 10MB

export class GoogleDriveStorageApiService {
  private client: GoogleDriveStorageApiClient;

  private fieldsSelection =
    'id,name,createdTime,modifiedTime,parents,mimeType,fileExtension,size';
  private getFieldsParam = `files(${this.fieldsSelection})`;
  private allFieldsParam = '*';
  private selectedFieldsParam = this.fieldsSelection;
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

  async exportFile(
    file: StorageEntity,
    mimeType: string,
    fileExtension: string,
    FileSystem: typeof FS
  ) {
    const accessToken = this.client.getAccessToken();
    const ext = !file?.extension ? `.${fileExtension}` : '';
    const filePath = Dirs.DocumentDir + `/${file.name}${ext}`;

    return await FileSystem.fetch(
      `${BASE_URL}${FILES_PARTICLE}/${file.id}?mimeType=${mimeType}`,
      {
        path: filePath,
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }
    );
  }

  async downloadFile(file: StorageEntity, FileSystem: typeof FS) {
    const accessToken = this.client.getAccessToken();
    const filePath = Dirs.DocumentDir + `/${file.name}`;

    return await FileSystem.fetch(
      `${BASE_URL}${FILES_PARTICLE}/${file.id}?alt=media`,
      {
        path: filePath,
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }
    );
  }

  private async initializeResumableUpload(
    file: LocalFile,
    folderId: string,
    FileSystem: typeof FS
  ) {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId],
    };

    const filePath = decodeURIComponent(file.uri.replace('file://', ''));
    const fileStats = await FileSystem.stat(filePath);
    const byteLength = fileStats.size;

    const initResponse = await this.client.axiosClient.post(
      UPLOAD_PARTICLE,
      metadata,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': file.type,
          'X-Upload-Content-Length': byteLength,
        },
        params: {
          uploadType: 'resumable',
        },
      }
    );

    if (initResponse?.status !== 200) {
      throw new Error(
        `Failed to initiate upload session with status ${initResponse?.status}`
      );
    }

    return initResponse.headers.location;
  }

  async localFileUpload(
    file: LocalFile,
    folderId: string,
    FileSystem: typeof FS
  ) {
    const resumableSessionUri = await this.initializeResumableUpload(
      file,
      folderId,
      FileSystem
    );
    let uploadedBytes = 0;
    const filePath = file.uri;
    const fileStats = await FileSystem.stat(filePath);
    const fileLength = fileStats.size;

    while (uploadedBytes < fileLength) {
      const remainingBytes = fileLength - uploadedBytes;
      const bytesToRead =
        remainingBytes < UPLOAD_CHUNK_SIZE ? remainingBytes : UPLOAD_CHUNK_SIZE;

      const chunk = await FileSystem.readFileChunk(
        filePath,
        uploadedBytes,
        bytesToRead,
        'base64'
      );
      const buffer = new Uint8Array(bytesToRead);
      const binaryString = atob(chunk);

      for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
      }

      const bytesRead = buffer.byteLength;
      const contentRange = `bytes ${uploadedBytes}-${uploadedBytes + bytesRead - 1}/${fileLength}`;

      try {
        const uploadResponse = await this.client.axiosClient.put(
          resumableSessionUri,
          buffer,
          {
            headers: {
              'Content-Type': file.type,
              'Content-Length': bytesRead,
              'Content-Range': contentRange,
            },
            params: {
              fields: this.fieldsSelection,
            },
          }
        );

        if (uploadResponse.status === 200) {
          return uploadResponse.data;
        }
      } catch (error) {
        if (error instanceof ApiException && error.code === 308) {
          uploadedBytes += bytesRead;
        }
      }
    }

    return null;
  }

  async updateFileMetadata(fileId: string, body: CommonRequestBody) {
    await this.client.axiosClient.patch(`${FILES_PARTICLE}/${fileId}`, body);
  }

  async deleteFile(fileId: string) {
    await this.client.axiosClient.delete(`${FILES_PARTICLE}/${fileId}`);
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

  async createPermission(
    fileId: string,
    body: CreatePermissionRequestBody,
    transferOwnership: boolean,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    return await this.client.axiosClient.post<PermissionRemote>(
      `${FILES_PARTICLE}/${fileId}/permissions`,
      body,
      {
        params: {
          fields: this.allFieldsParam,
          transferOwnership: transferOwnership,
          sendNotificationEmail: sendNotificationEmail,
          emailMessage: emailMessage,
        },
      }
    );
  }

  async deletePermission(fileId: string, permissionId: string) {
    await this.client.axiosClient.delete(
      `${FILES_PARTICLE}/${fileId}/permissions/${permissionId}`
    );
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    body: UpdatePermissionRequestBody,
    transferOwnership: boolean,
    sendNotificationEmail: boolean
  ) {
    return await this.client.axiosClient.patch<PermissionRemote>(
      `${FILES_PARTICLE}/${fileId}/permissions/${permissionId}`,
      body,
      {
        params: {
          fields: this.allFieldsParam,
          transferOwnership: transferOwnership,
          sendNotificationEmail: sendNotificationEmail,
        },
      }
    );
  }
}
