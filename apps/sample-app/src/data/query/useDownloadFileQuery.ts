import { Platform } from 'react-native';

import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';
import { Dirs, FileSystem } from 'react-native-file-access';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { FileType } from '@/types/FileTypes';
import { normalizeFileType } from '@/utils/normalizeFileType';

import { QK_DOWNLOAD_FILE } from '../client/queryKeys';

const requestAndroidPermission = async () => {
  const androidPermissions = [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

  try {
    const statuses = await Promise.all(
      androidPermissions.map((permission) => check(permission))
    );

    let allGranted = statuses.every((status) => status === RESULTS.GRANTED);

    if (allGranted) {
      return true;
    }

    const requestStatuses = await Promise.all(
      androidPermissions.map((permission) => request(permission))
    );

    allGranted = requestStatuses.every((status) => status === RESULTS.GRANTED);

    return allGranted;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const downloadFile = async (
  storageClient: IStorageClient,
  showSnackbar: (message: string) => void,
  file?: StorageEntity
): Promise<boolean> => {
  if (!file) {
    return false;
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

      if (Platform.OS === 'android') {
        await requestAndroidPermission();

        const filePath = `${Dirs.DocumentDir}/${file.name}`;
        await FileSystem.cpExternal(filePath, file.name, 'downloads');
      }
    }

    showSnackbar(`${file.name} file downloaded successfully!`);

    return true;
  } catch (error) {
    console.error(error);
    showSnackbar(`Failed to download ${file.name} file!`);
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
