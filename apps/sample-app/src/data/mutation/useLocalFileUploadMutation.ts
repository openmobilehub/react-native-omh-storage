import {
  IStorageClient,
  LocalFile,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FileSystem } from 'react-native-file-access';

import { QK_LIST_FILES, QK_UPLOAD_FILE } from '../client/queryKeys';

export const useLocalFileUploadMutation = (
  storageClient: IStorageClient,
  folderId: string
) => {
  const queryClient = useQueryClient();

  return useMutation<StorageEntity, StorageException, LocalFile>({
    mutationKey: [QK_UPLOAD_FILE, folderId],
    mutationFn: (file) =>
      storageClient.localFileUpload(file, folderId, FileSystem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_LIST_FILES, folderId] });
    },
    retry: false, //It was causing interruptions in the upload process, beacuse of 308 status code
  });
};
