import { Platform } from 'react-native';

import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation } from '@tanstack/react-query';
import { Dirs } from 'react-native-file-access';

import { FileType } from '@/types/FileTypes';
import copyFileToDownloads from '@/utils/copyFileToDownloads';
import { normalizeFileType } from '@/utils/normalizeFileType';

type MutationData = {
  file: StorageEntity;
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
    await copyFileToDownloads(fileName, filePath);
  }
};

export const useDownloadFileMutation = (storageClient: IStorageClient) => {
  return useMutation<void, StorageException, MutationData>({
    mutationFn: ({ file }) => downloadFile(storageClient, file),
  });
};
