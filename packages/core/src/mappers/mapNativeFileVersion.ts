import { FileVersion } from '@openmobilehub/storage-core';

import type { NativeFileVersion } from '../StorageClient.nativeTypes';

export const mapNativeFileVersion = (
  fileNative: NativeFileVersion
): FileVersion => {
  const lastModified = new Date(fileNative.lastModified);

  return new FileVersion({
    fileId: fileNative.fileId,
    versionId: fileNative.versionId,
    lastModified,
  });
};
