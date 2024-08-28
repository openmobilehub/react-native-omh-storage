import {
  mapNativeFileVersion,
  mapNativePermission,
  mapNativeStorageEntity,
} from './mappers';
import {
  StorageEntityMetadata,
  type PermissionRecipient,
  type PermissionRole,
  type StorageEntity,
} from './model';
import type { NativeStorageClient } from './StorageClient.nativeTypes';
import type { IStorageClient, LocalFile } from './StorageClient.types';
import { mapNativeException } from './utils/errorHandling';

export abstract class BaseNativeStorageClient implements IStorageClient {
  nativeStorageModule: NativeStorageClient;
  readonly rootFolderId: string;

  //TODO: [Fallback] Remove fallbackClient
  fallbackClient: IStorageClient;

  constructor(
    nativeStorageModule: NativeStorageClient,
    rootFolderId: string,
    fallbackClient: IStorageClient
  ) {
    this.nativeStorageModule = nativeStorageModule;
    this.rootFolderId = rootFolderId;

    this.fallbackClient = fallbackClient;

    this.nativeStorageModule.initializeStorageClient();
  }

  async listFiles(folderId: string): Promise<StorageEntity[]> {
    try {
      const nativeStorageEntities =
        await this.nativeStorageModule.listFiles(folderId);

      return nativeStorageEntities.map(mapNativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async getFileMetadata(fileId: string) {
    try {
      const nativeStorageEntityMetadata =
        await this.nativeStorageModule.getFileMetadata(fileId);

      return new StorageEntityMetadata({
        entity: mapNativeStorageEntity(nativeStorageEntityMetadata.entity),
        originalMetadata: JSON.parse(
          nativeStorageEntityMetadata.originalMetadata
        ),
      });
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async search(query: string) {
    try {
      const nativeStorageEntities =
        await this.nativeStorageModule.search(query);

      return nativeStorageEntities.map(mapNativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async createFileWithMimeType(
    name: string,
    mimeType: string,
    parentId?: string
  ) {
    try {
      const nativeStorageEntity =
        await this.nativeStorageModule.createFileWithMimeType(
          name,
          mimeType,
          parentId ?? this.rootFolderId
        );

      return nativeStorageEntity && mapNativeStorageEntity(nativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async createFileWithExtension(
    name: string,
    fileExtension: string,
    parentId?: string
  ) {
    try {
      const nativeStorageEntity =
        await this.nativeStorageModule.createFileWithExtension(
          name,
          fileExtension,
          parentId ?? this.rootFolderId
        );

      return nativeStorageEntity && mapNativeStorageEntity(nativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async createFolder(name: string, parentId?: string) {
    try {
      const nativeStorageEntity = await this.nativeStorageModule.createFolder(
        name,
        parentId ?? this.rootFolderId
      );

      return nativeStorageEntity && mapNativeStorageEntity(nativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async localFileUpload(file: LocalFile, folderId: string) {
    try {
      const nativeStorageEntity = await this.nativeStorageModule.uploadFile(
        file.name,
        file.uri,
        folderId
      );
      return mapNativeStorageEntity(nativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.nativeStorageModule.deleteFile(fileId);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async permanentlyDeleteFile(fileId: string) {
    try {
      await this.nativeStorageModule.permanentlyDeleteFile(fileId);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async getPermissions(fileId: string) {
    try {
      const nativePermissions =
        await this.nativeStorageModule.getPermissions(fileId);

      return nativePermissions.map(mapNativePermission);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async getWebUrl(fileId: string) {
    try {
      return await this.nativeStorageModule.getWebUrl(fileId);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async createPermission(
    fileId: string,
    role: PermissionRole,
    recipient: PermissionRecipient,
    sendNotificationEmail: boolean,
    emailMessage?: string
  ) {
    try {
      const recipientEmail =
        recipient.type === 'user' || recipient.type === 'group'
          ? recipient.email
          : undefined;
      const recipientDomain =
        recipient.type === 'domain' ? recipient.domain : undefined;
      const recipientObjectId =
        recipient.type === 'objectId' ? recipient.objectId : undefined;
      const recipientAlias =
        recipient.type === 'alias' ? recipient.alias : undefined;

      const nativePermission = await this.nativeStorageModule.createPermission(
        fileId,
        role,
        sendNotificationEmail,
        recipient.type,
        emailMessage,
        recipientEmail,
        recipientDomain,
        recipientObjectId,
        recipientAlias
      );

      return nativePermission && mapNativePermission(nativePermission);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async deletePermission(fileId: string, permissionId: string) {
    try {
      return await this.nativeStorageModule.deletePermission(
        fileId,
        permissionId
      );
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async updatePermission(
    fileId: string,
    permissionId: string,
    role: PermissionRole
  ) {
    try {
      const nativePermission = await this.nativeStorageModule.updatePermission(
        fileId,
        permissionId,
        role
      );

      return nativePermission && mapNativePermission(nativePermission);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async exportFile(
    file: StorageEntity,
    mimeType: string,
    fileExtension: string,
    saveDirectory: string
  ) {
    try {
      const fileName = `${file.name}.${fileExtension}`;
      const filePath = `${saveDirectory}/${fileName}`;

      return this.nativeStorageModule.exportFile(file.id, mimeType, filePath);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async downloadFile(file: StorageEntity, saveDirectory: string) {
    try {
      const filePath = `${saveDirectory}/${file.name}`;

      return this.nativeStorageModule.downloadFile(file.id, filePath);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async updateFile(file: LocalFile, fileId: string): Promise<StorageEntity> {
    try {
      const nativeStorageEntity = await this.nativeStorageModule.updateFile(
        file.name,
        file.uri,
        fileId
      );
      return mapNativeStorageEntity(nativeStorageEntity);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async getFileVersions(fileId: string) {
    try {
      const nativeFileVersions =
        await this.nativeStorageModule.getFileVersions(fileId);

      return nativeFileVersions.map(mapNativeFileVersion);
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }

  async downloadFileVersion(
    file: StorageEntity,
    versionId: string,
    saveDirectory: string
  ) {
    try {
      const filePath = `${saveDirectory}/${file.name}`;

      return this.nativeStorageModule.downloadFileVersion(
        file.id,
        versionId,
        filePath
      );
    } catch (exception) {
      return Promise.reject(mapNativeException(exception));
    }
  }
}
