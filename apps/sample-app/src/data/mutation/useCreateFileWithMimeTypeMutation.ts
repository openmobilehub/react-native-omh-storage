import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_LIST_FILES } from '../client/queryKeys';

type MutationData = {
  name: string;
  mimeType: string;
  parentId?: string;
};

export const useCreateFileWithMimeTypeMutation = (
  storageClient: IStorageClient
) => {
  const queryClient = useQueryClient();

  return useMutation<StorageEntity, StorageException, MutationData>({
    mutationFn: ({ name, mimeType, parentId }) =>
      storageClient.createFileWithMimeType(name, mimeType, parentId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_LIST_FILES] });
    },
  });
};
