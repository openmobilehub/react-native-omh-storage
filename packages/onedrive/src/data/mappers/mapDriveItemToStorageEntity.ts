import {
  ApiException,
  File,
  Folder,
  getExtensionFromFilePath,
  getMimeTypeFromExtension,
} from '@openmobilehub/storage-core';

import type { DriveItem } from '../response/DriveItem';

export const mapDriveItemToStorageEntity = (driveItem: DriveItem) => {
  const id = driveItem.id;
  const name = driveItem.name;
  const parentId = driveItem.parentReference?.id;

  if (!id || !name) {
    throw new ApiException('Invalid remote drive item data');
  }

  const isFolder = driveItem.folder != null;

  const createdTime = driveItem.createdDateTime
    ? new Date(driveItem.createdDateTime)
    : undefined;

  const modifiedTime = driveItem.lastModifiedDateTime
    ? new Date(driveItem.lastModifiedDateTime)
    : undefined;

  if (isFolder) {
    return new Folder({
      id,
      name,
      createdTime,
      modifiedTime,
      parentId,
    });
  } else {
    const extension = getExtensionFromFilePath(driveItem.name);
    const mimeType =
      driveItem.file?.mimeType || getMimeTypeFromExtension(extension);
    const size = driveItem.size;

    return new File({
      id,
      name,
      createdTime,
      modifiedTime,
      parentId,
      mimeType,
      extension,
      size,
    });
  }
};
