import { ApiException, type LocalFile } from '@openmobilehub/storage-core';
import { FileSystem } from 'react-native-file-access';

import type { CreateFolderBody } from './data/body/CreateFolderBody';
import type { InviteRequestBody } from './data/body/InviteRequestBody';
import type { DriveItem } from './data/response/DriveItem';
import { type FileListRemote } from './data/response/FileListRemote';
import type { PermissionListRemote } from './data/response/PermissionListRemote';
import type { PermissionRemote } from './data/response/PermissionRemote';
import { type VersionListRemote } from './data/response/VersionListRemote';
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

  async search(query: string) {
    return this.client.axiosClient.get<FileListRemote>(
      `${DRIVES_PARTICLE}/root/search(q='${query}')`
    );
  }

  async getFileMetadata(fileId: string) {
    return this.client.axiosClient.get<DriveItem>(
      `${ITEMS_PARTICLE}/${fileId}`
    );
  }

  async deleteFile(fileId: string) {
    await this.client.axiosClient.delete(`${ITEMS_PARTICLE}/${fileId}`);
  }

  async getDownloadFileUrl(fileId: string) {
    const response = await this.client.axiosClient.get<{
      ['@microsoft.graph.downloadUrl']: string;
    }>(`${ITEMS_PARTICLE}/${fileId}`, {
      params: {
        select: 'id,@microsoft.graph.downloadUrl',
      },
    });

    return response.data['@microsoft.graph.downloadUrl'];
  }

  async getDownloadVersionFileUrl(fileId: string, versionId: string) {
    const response = await this.client.axiosClient.get<{
      ['@microsoft.graph.downloadUrl']: string;
    }>(`${ITEMS_PARTICLE}/${fileId}/versions/${versionId}`, {
      params: {
        select: 'id,@microsoft.graph.downloadUrl',
      },
    });

    return response.data['@microsoft.graph.downloadUrl'];
  }

  async downloadFile(
    downloadUrl: string,
    fileName: string,
    saveDirectory: string
  ) {
    const filePath = `${saveDirectory}/${fileName}`;

    const fileResponse = await FileSystem.fetch(downloadUrl, {
      path: filePath,
      method: 'GET',
    });

    if (!fileResponse.ok) {
      throw new ApiException(fileResponse.statusText, fileResponse.status);
    }
  }

  async initializeResumableUpload(file: LocalFile, folderId: string) {
    const response = await this.client.axiosClient.post<{ uploadUrl: string }>(
      `${ITEMS_PARTICLE}/${folderId}:/${file.name}:/createUploadSession`,
      {
        item: {
          '@microsoft.graph.conflictBehavior': 'rename',
          'name': file.name,
        },
      }
    );

    return response.data.uploadUrl;
  }

  async initializeResumableUpdate(fileId: string) {
    const response = await this.client.axiosClient.post<{ uploadUrl: string }>(
      `${ITEMS_PARTICLE}/${fileId}/createUploadSession`,
      {
        item: {
          '@microsoft.graph.conflictBehavior': 'replace',
        },
      }
    );

    return response.data.uploadUrl;
  }

  async simplyUploadFile(file: LocalFile, folderId: string) {
    const binaryStreamBody = new Uint8Array(file.size);

    const response = await this.client.axiosClient.put<DriveItem>(
      `${ITEMS_PARTICLE}/${folderId}:/${file.name}:/content`,
      binaryStreamBody,
      {
        params: {
          '@microsoft.graph.conflictBehavior': 'rename',
        },
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );

    return response.data;
  }

  async simplyUpdateFile(file: LocalFile, fileId: string) {
    const binaryStreamBody = new Uint8Array(file.size);

    const response = await this.client.axiosClient.put<DriveItem>(
      `${ITEMS_PARTICLE}/${fileId}/content`,
      binaryStreamBody,
      {
        params: {
          '@microsoft.graph.conflictBehavior': 'replace',
        },
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );

    return response.data;
  }

  async resumableUploadFile(uploadUrl: string, file: LocalFile) {
    const fileStats = await FileSystem.stat(file.uri);
    const fileLength = fileStats.size;
    let uploadedBytes = 0;

    while (uploadedBytes < fileLength) {
      const remainingBytes = fileLength - uploadedBytes;
      const bytesToRead =
        remainingBytes < UPLOAD_CHUNK_SIZE ? remainingBytes : UPLOAD_CHUNK_SIZE;

      const chunk = await FileSystem.readFileChunk(
        file.uri,
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

      const response = await this.clientNoAuth.axiosClient.put<DriveItem>(
        uploadUrl,
        buffer,
        {
          headers: {
            'Content-Range': `bytes ${uploadedBytes}-${uploadedBytes + bytesRead - 1}/${fileLength}`,
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      if (response.status === 202) {
        uploadedBytes += bytesRead;
      }

      if (response.status === 201 || response.status === 200) {
        return response.data;
      }
    }

    throw new ApiException('Failed to upload file');
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

  async getFileVersions(fileId: string) {
    return await this.client.axiosClient.get<VersionListRemote>(
      `${ITEMS_PARTICLE}/${fileId}/versions`
    );
  }

  async updateFileMetadata(fileId: string, body: DriveItem) {
    return await this.client.axiosClient.patch<DriveItem>(
      `${ITEMS_PARTICLE}/${fileId}`,
      { ...body, '@microsoft.graph.conflictBehavior': 'rename' }
    );
  }

  async getPermissions(fileId: string) {
    return await this.client.axiosClient.get<PermissionListRemote>(
      `${ITEMS_PARTICLE}/${fileId}/permissions`
    );
  }

  async createPermission(fileId: string, body: InviteRequestBody) {
    return await this.client.axiosClient.post<PermissionListRemote>(
      `${ITEMS_PARTICLE}/${fileId}/invite`,
      body
    );
  }

  async deletePermission(fileId: string, permissionId: string) {
    return await this.client.axiosClient.delete(
      `${ITEMS_PARTICLE}/${fileId}/permissions/${permissionId}`
    );
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    body: PermissionRemote
  ) {
    return await this.client.axiosClient.patch<PermissionRemote>(
      `${ITEMS_PARTICLE}/${fileId}/permissions/${permissionId}`,
      body
    );
  }
}
