import { ApiException, type LocalFile } from '@openmobilehub/storage-core';
import { FileSystem } from 'react-native-file-access';

import { type FileListRemote } from './data/response/FileListRemote';
import type { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';

const FILES_PARTICLE = 'drive/v3/files';
const UPLOAD_PARTICLE = 'upload/drive/v3/files';
const UPLOAD_CHUNK_SIZE = 1024 * 1024 * 10; // 10MB

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

  private async initializeResumableUpload(file: LocalFile, folderId: string) {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId],
    };

    const filePath = file.uri;
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

  async localFileUpload(file: LocalFile, folderId: string) {
    const resumableSessionUri = await this.initializeResumableUpload(
      file,
      folderId
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
              fields: this.fieldsParam,
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
}
