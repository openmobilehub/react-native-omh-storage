import {
  ApiException,
  File,
  Folder,
  getExtensionFromFilePath,
  getMimeTypeFromExtension,
} from '@openmobilehub/storage-core';
import type { StorageEntity } from '@openmobilehub/storage-core';

import type {
  FileMetadata,
  FolderMetadata,
  Metadata,
} from '../response/Metadata';

export const mapMetadataToStorageEntity = (
  metadata: Metadata
): StorageEntity => {
  if (!metadata['.tag']) {
    throw new ApiException('Invalid metadata');
  }

  const isFile = metadata['.tag'] === 'file';

  if (isFile) {
    return mapFileMetadataToStorageEntity(metadata as FileMetadata);
  } else {
    return mapFolderMetadataToStorageEntity(metadata as FolderMetadata);
  }
};

export const mapFileMetadataToStorageEntity = (
  metadata: FileMetadata
): StorageEntity => {
  if (!metadata.id || !metadata.name) {
    throw new ApiException('Invalid metadata');
  }

  const createdTime = metadata.client_modified
    ? new Date(metadata.client_modified)
    : undefined;

  const modifiedTime = metadata.server_modified
    ? new Date(metadata.server_modified)
    : undefined;

  const extension = getExtensionFromFilePath(metadata.path_display);
  const mimeType = getMimeTypeFromExtension(extension);

  return new File({
    id: metadata.id,
    name: metadata.name,
    createdTime,
    modifiedTime,
    parentId: metadata.sharing_info?.parent_shared_folder_id,
    mimeType,
    extension: extension,
    size: metadata.size,
  });
};

export const mapFolderMetadataToStorageEntity = (
  metadata: FolderMetadata
): StorageEntity => {
  if (!metadata.id || !metadata.name) {
    throw new ApiException('Invalid metadata');
  }

  return new Folder({
    id: metadata.id,
    name: metadata.name,
    createdTime: undefined,
    modifiedTime: undefined,
    parentId: metadata.sharing_info?.parent_shared_folder_id,
  });
};
