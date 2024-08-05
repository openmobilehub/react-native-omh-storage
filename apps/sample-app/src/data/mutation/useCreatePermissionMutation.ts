import {
  CreatePermission,
  IStorageClient,
  Permission,
  StorageException,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_FILE_PERMISSIONS } from '../client/queryKeys';

type MutationData = {
  fileId: string;
  permission: CreatePermission;
  sendNotificationEmail: boolean;
  emailMessage?: string;
};

export const useCreatePermissionMutation = (storageClient: IStorageClient) => {
  const queryClient = useQueryClient();

  return useMutation<Permission | undefined, StorageException, MutationData>({
    mutationFn: ({ fileId, permission, sendNotificationEmail, emailMessage }) =>
      storageClient.createPermission(
        fileId,
        permission,
        sendNotificationEmail,
        emailMessage
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_FILE_PERMISSIONS] });
    },
  });
};
