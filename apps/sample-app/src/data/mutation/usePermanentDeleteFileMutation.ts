import { IStorageClient, StorageException } from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_LIST_FILES } from '../client/queryKeys';

type MutationData = {
  fileId: string;
};

export const usePermanentDeleteFileMutation = (
  storageClient: IStorageClient,
  onSettled?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation<void, StorageException, MutationData>({
    mutationFn: async ({ fileId }) =>
      await storageClient.permanentlyDeleteFile(fileId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_LIST_FILES] });
      onSettled?.();
    },
  });
};
