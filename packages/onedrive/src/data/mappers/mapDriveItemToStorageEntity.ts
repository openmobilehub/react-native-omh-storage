import {
  ApiException,
  File,
  Folder,
  getExtensionFromFilePath,
  getMimeTypeFromExtension,
  type StorageEntity,
} from '@openmobilehub/storage-core';

import type { DriveItem } from '../response/DriveItem';

export const mapDriveItemToStorageEntity = (
  driveItem: DriveItem
): StorageEntity => {
  if (!driveItem.id || !driveItem.name) {
    throw new ApiException('Invalid remote drive item data');
  }

  const isFolder = driveItem.folder !== undefined && driveItem.folder !== null;

  const createdTime = undefined; // Microsoft does not provide a created date
  const modifiedTime = driveItem.lastModifiedDateTime
    ? new Date(driveItem.lastModifiedDateTime)
    : undefined;

  const parentId = driveItem.parentReference?.id;

  if (isFolder) {
    return new Folder({
      id: driveItem.id,
      name: driveItem.name,
      createdTime,
      modifiedTime,
      parentId: parentId,
    });
  } else {
    const extension = getExtensionFromFilePath(driveItem.name);
    const mimeType = getMimeTypeFromExtension(extension);

    return new File({
      id: driveItem.id,
      name: driveItem.name,
      createdTime,
      modifiedTime,
      parentId: parentId,
      mimeType: mimeType,
      extension: extension,
      size: driveItem.size,
    });
  }
};
