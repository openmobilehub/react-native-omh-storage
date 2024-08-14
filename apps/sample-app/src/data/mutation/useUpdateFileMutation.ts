import {
  IStorageClient,
  LocalFile,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_LIST_FILES } from '../client/queryKeys';

type MutationData = {
  file: LocalFile;
  fileId: string;
};

export const useUpdateFileMutation = (storageClient: IStorageClient) => {
  const queryClient = useQueryClient();

  return useMutation<StorageEntity, StorageException, MutationData>({
    mutationFn: ({ file, fileId }) => storageClient.updateFile(file, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_LIST_FILES] });
    },
    retry: false,
  });
};
