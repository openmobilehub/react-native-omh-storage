import { Platform } from 'react-native';

import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation } from '@tanstack/react-query';
import { Dirs } from 'react-native-file-access';

import copyFileToDownloads from '@/utils/copyFileToDownloads';

type MutationData = {
  file: StorageEntity;
  versionId: string;
};

const downloadFileVersion = async (
  storageClient: IStorageClient,
  file: StorageEntity,
  versionId: string
) => {
  const saveDirectory = Dirs.DocumentDir;

  const fileName = file.name;
  const filePath = `${Dirs.DocumentDir}/${fileName}`;

  await storageClient.downloadFileVersion(file, versionId, saveDirectory);

  if (Platform.OS === 'android') {
    await copyFileToDownloads(fileName, filePath);
  }
};

export const useDownloadFileVersionMutation = (
  storageClient: IStorageClient
) => {
  return useMutation<void, StorageException, MutationData>({
    mutationFn: ({ file, versionId }) =>
      downloadFileVersion(storageClient, file, versionId),
  });
};
