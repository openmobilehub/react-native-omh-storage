import { ApiException, type LocalFile } from '@openmobilehub/storage-core';
import RNBlobUtil from 'react-native-blob-util';

import { type FileListRemote } from './data/response/FileListRemote';
import type { GoogleDriveStorageApiClient } from './GoogleDriveStorageApiClient';

const FILES_PARTICLE = 'drive/v3/files';
const UPLOAD_PARTICLE = 'upload/drive/v3/files';
const CHUNK_SIZE = 256 * 1024;

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

    const filePath = file.uri.replace('file://', ''); // Remove file:// prefix as RNBlobUtil.fs.readFile requires it
    const base64Data = await RNBlobUtil.fs.readFile(filePath, 'base64');
    const byteLength = atob(base64Data).length;

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
    const filePath = file.uri.replace('file://', ''); // Remove file:// prefix as RNBlobUtil.fs.readFile requires it

    try {
      //TODO: Change to readStream - I already tried it but was stuck when stream was opened. stream.onData was not logging any activity.
      const base64Data = await RNBlobUtil.fs.readFile(filePath, 'base64');
      const binaryString = atob(base64Data);
      const byteLength = binaryString.length;

      while (uploadedBytes < byteLength) {
        const bytesToRead = Math.min(byteLength - uploadedBytes, CHUNK_SIZE);
        const chunk = binaryString.slice(
          uploadedBytes,
          uploadedBytes + bytesToRead
        );
        const contentRange = `bytes ${uploadedBytes}-${uploadedBytes + bytesToRead - 1}/${byteLength}`;

        const chunkArray = new Uint8Array(chunk.length);
        for (let i = 0; i < chunk.length; i++) {
          chunkArray[i] = chunk.charCodeAt(i);
        }

        const chunkSize = chunkArray.byteLength;
        if (chunkSize !== bytesToRead) {
          throw new Error(
            `Chunk size mismatch: expected ${bytesToRead}, got ${chunkSize}`
          );
        }

        try {
          const uploadResponse = await this.client.axiosClient.put(
            resumableSessionUri,
            chunkArray,
            {
              headers: {
                'Content-Type': file.type,
                'Content-Length': chunkSize,
                'Content-Range': contentRange,
              },
            }
          );

          uploadedBytes += bytesToRead;

          if (uploadedBytes >= byteLength) {
            return uploadResponse.data;
          }
        } catch (error) {
          if (error instanceof ApiException && error.code === 308) {
            uploadedBytes += bytesToRead;
          } else {
            throw error;
          }
        }
      }
    } catch (err) {
      console.error('Error reading file:', err);
      throw err;
    }
  }
}
