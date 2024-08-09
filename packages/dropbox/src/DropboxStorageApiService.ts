import type { LocalFile, StorageEntity } from '@openmobilehub/storage-core';
import { Dirs, FileSystem } from 'react-native-file-access';

import { CONTENT_URL } from './data/constants/constants';
import { type FileListRemote } from './data/response/FileListRemote';
import type { SearchFileListRemote } from './data/response/SearchFileListRemote';
import type { DropboxStorageApiClient } from './DropboxStorageApiClient';

const FILES_PARTICLE = 'files';
const UPLOAD_CHUNK_SIZE = 1024 * 1024 * 10; // 10MB
export class DropboxStorageApiService {
  private client: DropboxStorageApiClient;

  constructor(apiClient: DropboxStorageApiClient) {
    this.client = apiClient;
  }

  async listFiles(folderId: string) {
    return await this.client.axiosClient.post<FileListRemote>(
      `${FILES_PARTICLE}/list_folder`,
      {
        path: folderId,
      }
    );
  }

  async searchFiles(query: string) {
    const response = await this.client.axiosClient.post<SearchFileListRemote>(
      `${FILES_PARTICLE}/search_v2`,
      {
        query,
      }
    );

    return response;
  }

  async deleteFile(fileId: string) {
    await this.client.axiosClient.post(`${FILES_PARTICLE}/delete_v2`, {
      path: fileId,
    });
  }

  async getFileMetadata(fileId: string) {
    return await this.client.axiosClient.post(
      `${FILES_PARTICLE}/get_metadata`,
      {
        path: fileId,
      }
    );
  }
  async downloadFile(file: StorageEntity) {
    const accessToken = this.client.getAccessToken();
    const filePath = `${Dirs.DocumentDir}/${file.name}`;
    const dropboxArgs = JSON.stringify({ path: file.id });

    return await FileSystem.fetch(`${CONTENT_URL}${FILES_PARTICLE}/download`, {
      path: filePath,
      method: 'POST',
      headers: {
        'Authorization': accessToken,
        'Dropbox-API-Arg': dropboxArgs,
      },
    });
  }

  private async initializeResumableUpload() {
    const initResponse = await this.client.axiosClient.post(
      `${CONTENT_URL}${FILES_PARTICLE}/upload_session/start`,
      null,
      {
        headers: {
          'Dropbox-API-Arg': JSON.stringify({ close: false }),
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    if (initResponse?.status !== 200) {
      throw new Error(
        `Failed to initiate upload session with status ${initResponse?.status}`
      );
    }

    return initResponse.data.session_id;
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    const sessionId = await this.initializeResumableUpload();
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

      await this.client.axiosClient.post(
        `${CONTENT_URL}${FILES_PARTICLE}/upload_session/append_v2`,
        buffer,
        {
          headers: {
            'Dropbox-API-Arg': JSON.stringify({
              cursor: {
                session_id: sessionId,
                offset: uploadedBytes,
              },
              close: false,
            }),
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      uploadedBytes += bytesRead;
    }

    const dropboxFilePath = `${folderId}/${file.name}`;

    const finishResponse = await this.client.axiosClient.post(
      `${CONTENT_URL}${FILES_PARTICLE}/upload_session/finish`,
      null,
      {
        headers: {
          'Dropbox-API-Arg': JSON.stringify({
            cursor: {
              session_id: sessionId,
              offset: uploadedBytes,
            },
            commit: {
              path: dropboxFilePath,
              mode: 'add',
              autorename: true,
              mute: false,
            },
          }),
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    if (finishResponse?.status === 200) {
      return finishResponse.data;
    }

    return null;
  }
}
