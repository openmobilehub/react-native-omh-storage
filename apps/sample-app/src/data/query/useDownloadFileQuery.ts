import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

import { FileType } from '@/types/FileTypes';
import { normalizeFileType } from '@/utils/normalizeFileType';

const downloadFile = async (
  storageClient: IStorageClient,
  file?: StorageEntity
) => {
  if (!file) return Promise.reject(new Error('No file provided'));
  let data;

  const isGoogleWorkspaceFile = file.mimeType.includes(
    'application/vnd.google-apps'
  );
  const normalizedGoogleFileType = normalizeFileType(file.mimeType as FileType);
  if (isGoogleWorkspaceFile) {
    data = await storageClient.exportFile(
      file,
      normalizedGoogleFileType.mimeType
    );
  } else {
    data = await storageClient.downloadFile(file);
    console.log('data', data);
    // await ReactNativeBlobUtil.fs.mv(
    //   data.data,
    //   ReactNativeBlobUtil.fs.dirs.DCIMDir + '/' + file.name
    // );
  }
  return 'Downloaded';
};

export const useDownloadFileQuery = (
  storageClient: IStorageClient,
  file?: StorageEntity
) => {
  return useQuery<StorageEntity, StorageException>({
    queryKey: ['downloadFile', file?.id],
    queryFn: () => downloadFile(storageClient, file),
    enabled: !!file,
  });
};
