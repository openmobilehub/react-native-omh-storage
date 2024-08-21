import { FileVersion } from '@openmobilehub/storage-core';

import type { VersionRemote } from '../response/VersionRemote';

export const mapVersionRemoteToFileVersion = (
  versionRemote: VersionRemote,
  fileId: string
): FileVersion => {
  return new FileVersion({
    fileId,
    versionId: versionRemote.id,
    lastModified: new Date(versionRemote.lastModifiedDateTime),
  });
};
