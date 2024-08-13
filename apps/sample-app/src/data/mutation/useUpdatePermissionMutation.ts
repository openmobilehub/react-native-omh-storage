import {
  IStorageClient,
  Permission,
  PermissionRole,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_FILE_PERMISSIONS } from '../client/queryKeys';

type MutationData = {
  fileId: string;
  permissionId: string;
  role: PermissionRole;
};

export const useUpdatePermissionMutation = (storageClient: IStorageClient) => {
  const queryClient = useQueryClient();

  return useMutation<Permission | void, StorageException, MutationData>({
    mutationFn: ({ fileId, permissionId, role }) =>
      storageClient.updatePermission(fileId, permissionId, role),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_FILE_PERMISSIONS] });
    },
    retry: false,
  });
};
