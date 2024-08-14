import {
  InvalidCredentialsException,
  type IStorageAuthClient,
  type LocalFile,
  type StorageEntity,
} from '@openmobilehub/storage-core';
import { Dirs, FileSystem } from 'react-native-file-access';

import type { AddFileMemberBody } from './data/body/AddFileMemberBody';
import type { AddFolderMemberBody } from './data/body/AddFolderMemberBody';
import type { ListFileMembersBody } from './data/body/ListFileMembersBody';
import type { ListFolderMembersBody } from './data/body/ListFolderMembersBody';
import type { RemoveFileMemberBody } from './data/body/RemoveFileMemberBody';
import type { RemoveFolderMemberBody } from './data/body/RemoveFolderMemberBody';
import type { UpdateFileMemberBody } from './data/body/UpdateFileMemberBody';
import type { UpdateFolderMemberBody } from './data/body/UpdateFolderMemberBody';
import { CONTENT_URL } from './data/constants/constants';
import type { CheckShareJobStatusResponse } from './data/response/CheckShareJobStatusResponse';
import { type FileListRemote } from './data/response/FileListRemote';
import type { ListFolderMembersResponse } from './data/response/ListFolderMembersResponse';
import type { ListMembersResponse } from './data/response/ListMembersResponse';
import type { Metadata } from './data/response/Metadata';
import type { SearchFileListRemote } from './data/response/SearchFileListRemote';
import type { ShareFolderResponse } from './data/response/ShareFolderResponse';
import type { SharingMetadata } from './data/response/SharingMetadata';
import type { DropboxStorageApiClient } from './DropboxStorageApiClient';

const FILES_PARTICLE = 'files';
const SHARING_PARTICLE = 'sharing';
const UPLOAD_CHUNK_SIZE = 1024 * 1024 * 10; // 10MB
export class DropboxStorageApiService {
  private client: DropboxStorageApiClient;
  private authClient: IStorageAuthClient;

  constructor(
    apiClient: DropboxStorageApiClient,
    authClient: IStorageAuthClient
  ) {
    this.client = apiClient;
    this.authClient = authClient;
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
    return await this.client.axiosClient.post<Metadata>(
      `${FILES_PARTICLE}/get_metadata`,
      {
        path: fileId,
      }
    );
  }

  async downloadFile(file: StorageEntity) {
    const accessToken = await this.authClient.getAccessToken();
    if (!accessToken) {
      throw new InvalidCredentialsException('Access token is not available');
    }

    const filePath = `${Dirs.DocumentDir}/${file.name}`;
    const dropboxArgs = JSON.stringify({ path: file.id });

    return await FileSystem.fetch(`${CONTENT_URL}${FILES_PARTICLE}/download`, {
      path: filePath,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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

  async getFilePermissions(body: ListFileMembersBody) {
    return this.client.axiosClient.post<ListMembersResponse>(
      `${SHARING_PARTICLE}/list_file_members`,
      body
    );
  }

  async getFolderPermissions(body: ListFolderMembersBody) {
    return this.client.axiosClient.post<ListFolderMembersResponse>(
      `${SHARING_PARTICLE}/list_folder_members`,
      body
    );
  }

  async getFileSharingMetadata(fileId: string) {
    return await this.client.axiosClient.post<SharingMetadata>(
      `${SHARING_PARTICLE}/get_file_metadata`,
      {
        file: fileId,
      }
    );
  }

  async getFolderSharingMetadata(sharedFolderId: string) {
    return await this.client.axiosClient.post<SharingMetadata>(
      `${SHARING_PARTICLE}/get_folder_metadata`,
      {
        shared_folder_id: sharedFolderId,
      }
    );
  }

  async addFileMember(body: AddFileMemberBody) {
    return await this.client.axiosClient.post(
      `${SHARING_PARTICLE}/add_file_member`,
      body
    );
  }

  async addFolderMember(body: AddFolderMemberBody) {
    return await this.client.axiosClient.post(
      `${SHARING_PARTICLE}/add_folder_member`,
      body
    );
  }

  async shareFolder(folderId: string) {
    return await this.client.axiosClient.post<ShareFolderResponse>(
      `${SHARING_PARTICLE}/share_folder`,
      {
        path: folderId,
        access_inheritance: 'inherit', // mimic Google Drive behaviour
      }
    );
  }

  async checkShareJobStatus(asyncJobIdValue: string) {
    return await this.client.axiosClient.post<CheckShareJobStatusResponse>(
      `${SHARING_PARTICLE}/check_share_job_status`,
      {
        async_job_id: asyncJobIdValue,
      }
    );
  }

  async removeFileMember(body: RemoveFileMemberBody) {
    return this.client.axiosClient.post(
      `${SHARING_PARTICLE}/remove_file_member_2`,
      body
    );
  }

  async removeFolderMember(body: RemoveFolderMemberBody) {
    return this.client.axiosClient.post(
      `${SHARING_PARTICLE}/remove_folder_member`,
      body
    );
  }

  async updateFileMember(body: UpdateFileMemberBody) {
    return this.client.axiosClient.post(
      `${SHARING_PARTICLE}/update_file_member`,
      body
    );
  }

  async updateFolderMember(body: UpdateFolderMemberBody) {
    return this.client.axiosClient.post(
      `${SHARING_PARTICLE}/update_folder_member`,
      body
    );
  }
}
