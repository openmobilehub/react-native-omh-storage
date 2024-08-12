import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';
import type { FetchResult } from 'react-native-file-access';

import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { FileType } from '@/types/FileTypes';
import { normalizeFileType } from '@/utils/normalizeFileType';

import { QK_DOWNLOAD_FILE } from '../client/queryKeys';

const downloadFile = async (
  storageClient: IStorageClient,
  showSnackbar: (message: string) => void,
  file?: StorageEntity
): Promise<FetchResult> => {
  if (!file) return Promise.reject(new Error('No file provided'));
  let data;

  try {
    const isGoogleWorkspaceFile = file?.mimeType?.includes(
      'application/vnd.google-apps'
    );
    const normalizedGoogleFileType = normalizeFileType(
      file.mimeType as FileType
    );
    if (isGoogleWorkspaceFile) {
      data = await storageClient.exportFile(
        file,
        normalizedGoogleFileType.mimeType,
        normalizedGoogleFileType.fileExtension
      );
    } else {
      data = await storageClient.downloadFile(file);
    }
    if (data?.status === 200) {
      showSnackbar(`${file.name} file downloaded successfully!`);
      return data;
    } else {
      showSnackbar('Failed to download file');
      throw new Error('Failed to download file');
    }
  } catch (e) {
    showSnackbar('Failed to download file');
    console.warn('Error downloading file', e);
    throw e;
  }
};

export const useDownloadFileQuery = (
  storageClient: IStorageClient,
  file?: StorageEntity
) => {
  const { showSnackbar } = useSnackbar();
  return useQuery<FetchResult, StorageException>({
    queryKey: [QK_DOWNLOAD_FILE, file?.id],
    queryFn: () => downloadFile(storageClient, showSnackbar, file),
    enabled: !!file,
  });
};
