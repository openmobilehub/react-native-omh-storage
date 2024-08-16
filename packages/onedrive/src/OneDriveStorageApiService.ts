import { type StorageEntity } from '@openmobilehub/storage-core';
import { Dirs, FileSystem } from 'react-native-file-access';

import type { CreateFolderBody } from './data/body/CreateFolderBody';
import type { DriveItem } from './data/response/DriveItem';
import { type FileListRemote } from './data/response/FileListRemote';
import type {
  OneDriveStorageApiClient,
  OneDriveStorageApiClientNoAuth,
} from './OneDriveStorageApiClient';

const DRIVES_PARTICLE = 'me/drive';
const ITEMS_PARTICLE = `${DRIVES_PARTICLE}/items`;
const UPLOAD_CHUNK_SIZE = 327_680 * 3; // 3 * 320KB - around 1MB

export class OneDriveStorageApiService {
  private client: OneDriveStorageApiClient;
  private clientNoAuth: OneDriveStorageApiClientNoAuth;

  constructor(
    apiClient: OneDriveStorageApiClient,
    clientNoAuth: OneDriveStorageApiClientNoAuth
  ) {
    this.client = apiClient;
    this.clientNoAuth = clientNoAuth;
  }

  async listFiles(parentId: string) {
    return await this.client.axiosClient.get<FileListRemote>(
      `${ITEMS_PARTICLE}/${parentId}/children`
    );
  }

  async getFileMetadata(fileId: string) {
    return this.client.axiosClient.get<DriveItem>(
      `${ITEMS_PARTICLE}/${fileId}`
    );
  }

  async downloadFile(file: StorageEntity) {
    const filePath = `${Dirs.DocumentDir}/${file.name}`;

    const response = await this.client.axiosClient.get(
      `${ITEMS_PARTICLE}/${file.id}/content`,
      {
        responseType: 'blob',
      }
    );

    const downloadUrl = response.request.responseURL;

    return FileSystem.fetch(downloadUrl, {
      path: filePath,
      method: 'GET',
    });
  }

  private async initializeResumableUpload(fileName: string, folderId: string) {
    const initResponse = await this.client.axiosClient.post(
      `${ITEMS_PARTICLE}/${folderId}:/${fileName}:/createUploadSession`,
      {
        item: {
          '@microsoft.graph.conflictBehavior': 'rename',
          'name': fileName,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return initResponse.data.uploadUrl;
  }

  async localFileUpload(fileName: string, filePath: string, folderId: string) {
    const fileStats = await FileSystem.stat(filePath);
    const fileLength = fileStats.size;
    let uploadUrl = await this.initializeResumableUpload(fileName, folderId);
    let uploadedBytes = 0;

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

      const response = await this.clientNoAuth.axiosClient.put(
        uploadUrl,
        buffer,
        {
          headers: {
            'Content-Range': `bytes ${uploadedBytes}-${uploadedBytes + bytesRead - 1}/${fileLength}`,
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      uploadedBytes += bytesRead;

      if (response.status === 201 || response.status === 200) {
        return response.data;
      }
    }

    return null;
  }

  async createFile(fileName: string, parentId: string) {
    const binaryStreamBody = new Uint8Array(0);

    return await this.client.axiosClient.put<DriveItem>(
      `${ITEMS_PARTICLE}/${parentId}:/${fileName}:/content`,
      binaryStreamBody,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }

  async createFolder(parentId: string, body: CreateFolderBody) {
    return await this.client.axiosClient.post<DriveItem>(
      `${ITEMS_PARTICLE}/${parentId}/children`,
      body
    );
  }
}
