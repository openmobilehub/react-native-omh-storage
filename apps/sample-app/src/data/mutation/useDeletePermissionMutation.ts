import { IStorageClient, StorageException } from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_FILE_PERMISSIONS } from '../client/queryKeys';

type MutationData = {
  fileId: string;
  permissionId: string;
};

export const useDeletePermissionMutation = (storageClient: IStorageClient) => {
  const queryClient = useQueryClient();

  return useMutation<void, StorageException, MutationData>({
    mutationFn: ({ fileId, permissionId }) =>
      storageClient.deletePermission(fileId, permissionId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_FILE_PERMISSIONS] });
    },
    retry: false,
  });
};
