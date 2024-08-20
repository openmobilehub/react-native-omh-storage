import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation } from '@tanstack/react-query';
import { Dirs } from 'react-native-file-access';

type MutationData = {
  file: StorageEntity;
  versionId: string;
};

export const useDownloadFileVersionMutation = (
  storageClient: IStorageClient
) => {
  return useMutation<void, StorageException, MutationData>({
    mutationFn: ({ file, versionId }) =>
      storageClient.downloadFileVersion(file, versionId, Dirs.DocumentDir),
  });
};
