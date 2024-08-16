import {
  ApiException,
  File,
  Folder,
  getExtensionFromFilePath,
  getMimeTypeFromExtension,
} from '@openmobilehub/storage-core';
import type { StorageEntity } from '@openmobilehub/storage-core';

import type { DriveItem } from '../response/DriveItem';

export const mapMetadataToStorageEntity = (metadata: DriveItem) => {
  if (!metadata.id || !metadata.name) {
    throw new ApiException('Invalid metadata');
  }

  const isFile = !!metadata.file;

  if (isFile) {
    return mapFileMetadataToStorageEntity(metadata);
  } else {
    return mapFolderMetadataToStorageEntity(metadata);
  }
};

export const mapFileMetadataToStorageEntity = (metadata: DriveItem) => {
  if (!metadata.id || !metadata.name) {
    throw new ApiException('Invalid metadata');
  }

  const createdTime = metadata.createdDateTime
    ? new Date(metadata.createdDateTime)
    : undefined;

  const modifiedTime = metadata.lastModifiedDateTime
    ? new Date(metadata.lastModifiedDateTime)
    : undefined;

  const extension = getExtensionFromFilePath(metadata.name);
  const mimeType =
    metadata.file?.mimeType || getMimeTypeFromExtension(extension);

  return new File({
    id: metadata.id,
    name: metadata.name,
    createdTime,
    modifiedTime,
    parentId: metadata.parentReference?.id,
    mimeType,
    extension,
    size: metadata.size,
  });
};

export const mapFolderMetadataToStorageEntity = (
  metadata: DriveItem
): StorageEntity => {
  if (!metadata.id || !metadata.name) {
    throw new ApiException('Invalid metadata');
  }

  const createdTime = metadata.createdDateTime
    ? new Date(metadata.createdDateTime)
    : undefined;

  const modifiedTime = metadata.lastModifiedDateTime
    ? new Date(metadata.lastModifiedDateTime)
    : undefined;

  return new Folder({
    id: metadata.id,
    name: metadata.name,
    createdTime,
    modifiedTime,
    parentId: metadata.parentReference?.id,
  });
};
