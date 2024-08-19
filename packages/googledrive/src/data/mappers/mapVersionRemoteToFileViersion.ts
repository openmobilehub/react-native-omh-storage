import { ApiException, FileVersion } from '@openmobilehub/storage-core';

import type { VersionRemote } from '../response/VersionRemote';

export const mapVersionRemoteToFileVersion = (
  fileId: string,
  versionRemote: VersionRemote
) => {
  if (!versionRemote.id || !versionRemote.modifiedTime) {
    throw new ApiException('Invalid version remote');
  }

  return new FileVersion({
    fileId,
    versionId: versionRemote.id,
    lastModified: new Date(versionRemote.modifiedTime),
  });
};
