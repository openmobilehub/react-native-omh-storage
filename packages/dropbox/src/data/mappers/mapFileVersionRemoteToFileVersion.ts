import { FileVersion } from '@openmobilehub/storage-core';

import type { FileVersionRemote } from '../response/FileVersionRemote';

export const mapFileVersionRemoteToFileVersion = (
  fileVersionRemote: FileVersionRemote
): FileVersion => {
  const clientModified = new Date(fileVersionRemote.client_modified);
  const serverModified = new Date(fileVersionRemote.server_modified);

  const lastModified =
    clientModified > serverModified ? clientModified : serverModified;

  return new FileVersion({
    fileId: fileVersionRemote.id,
    versionId: fileVersionRemote.rev,
    lastModified,
  });
};
