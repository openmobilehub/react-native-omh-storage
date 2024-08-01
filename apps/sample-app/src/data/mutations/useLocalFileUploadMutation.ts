import {
  IStorageClient,
  LocalFile,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLocalFileUploadMutation = (
  storageClient: IStorageClient,
  folderId: string
) => {
  const queryClient = useQueryClient();

  return useMutation<StorageEntity, StorageException, LocalFile>({
    mutationKey: ['fileUpload', folderId],
    mutationFn: (file) => storageClient.localFileUpload(file, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fileList', folderId] });
    },
  });
};
