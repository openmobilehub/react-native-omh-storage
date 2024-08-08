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
    retry: false, //It was causing interruptions in the upload process, beacuse of 308 status code
  });
};
