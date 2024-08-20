import { Platform } from 'react-native';

import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';
import { Dirs, FileSystem } from 'react-native-file-access';

import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { FileType } from '@/types/FileTypes';
import { normalizeFileType } from '@/utils/normalizeFileType';

import { QK_DOWNLOAD_FILE } from '../client/queryKeys';

const downloadFile = async (
  storageClient: IStorageClient,
  showSnackbar: (message: string) => void,
  file?: StorageEntity
) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const saveDir = Dirs.DocumentDir;

  try {
    const isGoogleWorkspaceFile = file?.mimeType?.includes(
      'application/vnd.google-apps'
    );
    const normalizedGoogleFileType = normalizeFileType(
      file.mimeType as FileType
    );

    if (isGoogleWorkspaceFile) {
      await storageClient.exportFile(
        file,
        normalizedGoogleFileType.mimeType,
        normalizedGoogleFileType.fileExtension,
        saveDir
      );
    } else {
      await storageClient.downloadFile(file, saveDir);
    }

    showSnackbar(`${file.name} file downloaded successfully!`);

    return true;
  } catch (error) {
    console.error(error);
    showSnackbar('Failed to download file');
    return false;
  }
};

export const useDownloadFileQuery = (
  storageClient: IStorageClient,
  file?: StorageEntity
) => {
  const { showSnackbar } = useSnackbar();
  return useQuery<boolean, StorageException>({
    queryKey: [QK_DOWNLOAD_FILE, file?.id],
    queryFn: () => downloadFile(storageClient, showSnackbar, file),
    enabled: !!file,
  });
};
