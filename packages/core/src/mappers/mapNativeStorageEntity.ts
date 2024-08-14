import { File, Folder } from '@openmobilehub/storage-core';
import type { StorageEntity } from '@openmobilehub/storage-core';

import type { NativeStorageEntity } from '../StorageClient.nativeTypes';

export const mapNativeStorageEntity = (
  fileNative: NativeStorageEntity
): StorageEntity => {
  const isFile = fileNative.type === 'file';

  const createdTime = fileNative.createdTime
    ? new Date(fileNative.createdTime)
    : undefined;

  const modifiedTime = fileNative.modifiedTime
    ? new Date(fileNative.modifiedTime)
    : undefined;

  if (isFile) {
    return new File({
      id: fileNative.id,
      name: fileNative.name,
      createdTime,
      modifiedTime,
      parentId: fileNative.parentId,
      mimeType: fileNative.mimeType,
      extension: fileNative.extension,
      size: fileNative.size,
    });
  } else {
    return new Folder({
      id: fileNative.id,
      name: fileNative.name,
      createdTime,
      modifiedTime,
      parentId: fileNative.parentId,
    });
  }
};
