import type { StorageEntity } from '@openmobilehub/storage-core';
import { ApiException, File, Folder } from '@openmobilehub/storage-core';

import { FOLDER_MIME_TYPE } from '../constants/constants';
import type { FileRemote } from '../response/FileRemote';

export const mapFileRemoteToStorageEntity = (
  fileRemote: FileRemote
): StorageEntity => {
  if (!fileRemote.id || !fileRemote.mimeType || !fileRemote.name) {
    throw new ApiException('Invalid remote file data');
  }

  const isFolder = fileRemote.mimeType === FOLDER_MIME_TYPE;

  const createdTime = fileRemote.createdTime
    ? new Date(fileRemote.createdTime)
    : undefined;

  const modifiedTime = fileRemote.modifiedTime
    ? new Date(fileRemote.modifiedTime)
    : undefined;

  if (isFolder) {
    return new Folder({
      id: fileRemote.id,
      name: fileRemote.name,
      createdTime,
      modifiedTime,
      parentId: fileRemote.parents?.[0],
    });
  } else {
    return new File({
      id: fileRemote.id,
      name: fileRemote.name,
      createdTime,
      modifiedTime,
      parentId: fileRemote.parents?.[0],
      mimeType: fileRemote.mimeType,
      extension: fileRemote.fileExtension,
      size: fileRemote.size,
    });
  }
};
