import { File } from '../../model/File';
import { Folder } from '../../model/Folder';
import type { StorageEntity } from '../../model/StorageEntity';
import type { FileRemote } from '../response/FileRemote';

export const mapFileRemoteToStorageEntity = (
  fileRemote: FileRemote
): StorageEntity => {
  if (!fileRemote.id || !fileRemote.mimeType || !fileRemote.name) {
    throw new Error('Invalid file remote');
  }

  const isFolder = fileRemote.mimeType === 'application/vnd.google-apps.folder';

  if (isFolder) {
    return new Folder({
      id: fileRemote.id,
      name: fileRemote.name,
      createdTime: undefined,
      modifiedTime: undefined,
      parentId: fileRemote.parents?.[0],
    });
  } else {
    return new File({
      id: fileRemote.id,
      name: fileRemote.name,
      createdTime: undefined,
      modifiedTime: undefined,
      parentId: fileRemote.parents?.[0],
      mimeType: fileRemote.mimeType,
      extension: fileRemote.fileExtension,
      size: fileRemote.size,
    });
  }
};
