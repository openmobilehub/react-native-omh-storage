import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_LIST_FILES } from '../client/queryKeys';

type MutationData = {
  name: string;
  parentId?: string;
};

export const useCreateFolderMutation = (storageClient: IStorageClient) => {
  const queryClient = useQueryClient();

  return useMutation<StorageEntity | undefined, StorageException, MutationData>(
    {
      mutationFn: ({ name, parentId }) =>
        storageClient.createFolder(name, parentId),
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [QK_LIST_FILES] });
      },
    }
  );
};
