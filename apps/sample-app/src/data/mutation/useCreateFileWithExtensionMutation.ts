import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_LIST_FILES } from '../client/queryKeys';

type MutationData = {
  name: string;
  fileExtension: string;
  parentId?: string;
};

export const useCreateFileWithExtensionMutation = (
  storageClient: IStorageClient
) => {
  const queryClient = useQueryClient();

  return useMutation<StorageEntity, StorageException, MutationData>({
    mutationFn: ({ name, fileExtension, parentId }) =>
      storageClient.createFileWithExtension(name, fileExtension, parentId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_LIST_FILES] });
    },
  });
};
