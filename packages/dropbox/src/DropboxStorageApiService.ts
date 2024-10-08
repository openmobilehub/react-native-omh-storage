import {
  ApiException,
  InvalidCredentialsException,
  type IStorageAuthClient,
  type LocalFile,
} from '@openmobilehub/storage-core';
import { FileSystem } from 'react-native-file-access';

import type { AddFileMemberBody } from './data/body/AddFileMemberBody';
import type { AddFolderMemberBody } from './data/body/AddFolderMemberBody';
import type { CommitInfo } from './data/body/CommitInfo';
import type { CreateFolderBody } from './data/body/CreateFolderBody';
import type { GetFileVersionsBody } from './data/body/GetFileVersionsBody';
import type { ListFileMembersBody } from './data/body/ListFileMembersBody';
import type { ListFolderMembersBody } from './data/body/ListFolderMembersBody';
import type { MoveFileBody } from './data/body/MoveFileBody';
import type { RemoveFileMemberBody } from './data/body/RemoveFileMemberBody';
import type { RemoveFolderMemberBody } from './data/body/RemoveFolderMemberBody';
import type { UpdateFileMemberBody } from './data/body/UpdateFileMemberBody';
import type { UpdateFolderMemberBody } from './data/body/UpdateFolderMemberBody';
import { CONTENT_URL } from './data/constants/constants';
import type { CheckShareJobStatusResponse } from './data/response/CheckShareJobStatusResponse';
import type { CreateFolderResponse } from './data/response/CreateFolderResponse';
import { type FileListRemote } from './data/response/FileListRemote';
import type { GetFileVersionsResponse } from './data/response/GetFileVersionsResponse';
import type { ListFolderMembersResponse } from './data/response/ListFolderMembersResponse';
import type { ListMembersResponse } from './data/response/ListMembersResponse';
import type { FileMetadata, Metadata } from './data/response/Metadata';
import type { MoveFileResponse } from './data/response/MoveFileResponse';
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

  async downloadFile(
    fileName: string,
    remotePath: string,
    saveDirectory: string
  ) {
    const accessToken = await this.authClient.getAccessToken();

    if (!accessToken) {
      throw new InvalidCredentialsException('Access token is not available');
    }

    const filePath = `${saveDirectory}/${fileName}`;
    const dropboxArgs = JSON.stringify({ path: remotePath });

    const fileResponse = await FileSystem.fetch(
      `${CONTENT_URL}${FILES_PARTICLE}/download`,
      {
        path: filePath,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Dropbox-API-Arg': dropboxArgs,
        },
      }
    );

    if (!fileResponse.ok) {
      throw new ApiException(fileResponse.statusText, fileResponse.status);
    }
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

  async localFileUpload(localFile: LocalFile, commitInfo: CommitInfo) {
    const sessionId = await this.initializeResumableUpload();
    let uploadedBytes = 0;
    const fileStats = await FileSystem.stat(localFile.uri);
    const fileLength = fileStats.size;

    while (uploadedBytes < fileLength) {
      const remainingBytes = fileLength - uploadedBytes;
      const bytesToRead =
        remainingBytes < UPLOAD_CHUNK_SIZE ? remainingBytes : UPLOAD_CHUNK_SIZE;

      const chunk = await FileSystem.readFileChunk(
        localFile.uri,
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

    return await this.client.axiosClient.post<FileMetadata>(
      `${CONTENT_URL}${FILES_PARTICLE}/upload_session/finish`,
      null,
      {
        headers: {
          'Dropbox-API-Arg': JSON.stringify({
            cursor: {
              session_id: sessionId,
              offset: uploadedBytes,
            },
            commit: commitInfo,
          }),
          'Content-Type': 'application/octet-stream',
        },
      }
    );
  }

  async createFolder(body: CreateFolderBody) {
    return this.client.axiosClient.post<CreateFolderResponse>(
      `${FILES_PARTICLE}/create_folder_v2`,
      body
    );
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

  async moveFile(body: MoveFileBody) {
    return this.client.axiosClient.post<MoveFileResponse>(
      `${FILES_PARTICLE}/move_v2`,
      body
    );
  }

  async getFileVersions(body: GetFileVersionsBody) {
    return this.client.axiosClient.post<GetFileVersionsResponse>(
      `${FILES_PARTICLE}/list_revisions`,
      body
    );
  }
}
