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
  const isFile = metadata['.tag'] === 'file';

  if (isFile) {
    const fileMetadata = metadata as FileMetadata;
    if (!fileMetadata.id || !fileMetadata.name) {
      throw new ApiException('Invalid metadata');
    }

    const createdTime = fileMetadata.client_modified
      ? new Date(fileMetadata.client_modified)
      : undefined;

    const modifiedTime = fileMetadata.server_modified
      ? new Date(fileMetadata.server_modified)
      : undefined;

    const extension = getExtensionFromFilePath(fileMetadata.path_display);
    const mimeType = getMimeTypeFromExtension(extension);

    return new File({
      id: fileMetadata.id,
      name: fileMetadata.name,
      createdTime,
      modifiedTime,
      parentId: fileMetadata.sharing_info?.parent_shared_folder_id,
      mimeType,
      extension: extension,
      size: fileMetadata.size,
    });
  } else {
    const folderMetadata = metadata as FolderMetadata;
    if (!folderMetadata.id || !folderMetadata.name) {
      throw new ApiException('Invalid metadata');
    }

    return new Folder({
      id: folderMetadata.id,
      name: folderMetadata.name,
      createdTime: undefined,
      modifiedTime: undefined,
      parentId: folderMetadata.sharing_info?.parent_shared_folder_id,
    });
  }
};
