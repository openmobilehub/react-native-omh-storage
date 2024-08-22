import { Platform } from 'react-native';

import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation } from '@tanstack/react-query';
import { Dirs, FileSystem } from 'react-native-file-access';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { FileType } from '@/types/FileTypes';
import { normalizeFileType } from '@/utils/normalizeFileType';

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
  file: StorageEntity
) => {
  const saveDirectory = Dirs.DocumentDir;

  const isGoogleWorkspaceFile = file?.mimeType?.includes(
    'application/vnd.google-apps'
  );
  const normalizedGoogleFileType = normalizeFileType(file.mimeType as FileType);

  let fileName;
  let filePath;

  if (isGoogleWorkspaceFile) {
    fileName = `${file.name}.${normalizedGoogleFileType.fileExtension}`;
    filePath = `${Dirs.DocumentDir}/${fileName}`;

    await storageClient.exportFile(
      file,
      normalizedGoogleFileType.mimeType,
      normalizedGoogleFileType.fileExtension,
      saveDirectory
    );
  } else {
    fileName = file.name;
    filePath = `${Dirs.DocumentDir}/${fileName}`;

    await storageClient.downloadFile(file, saveDirectory);
  }

  if (Platform.OS === 'android') {
    await requestAndroidPermission();

    await FileSystem.cpExternal(filePath, fileName, 'downloads');
  }
};

export const useDownloadFileMutation = (storageClient: IStorageClient) => {
  return useMutation<void, StorageException, StorageEntity>({
    mutationFn: (file) => downloadFile(storageClient, file),
  });
};
