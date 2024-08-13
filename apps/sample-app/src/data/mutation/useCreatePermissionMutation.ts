import {
  IStorageClient,
  Permission,
  StorageException,
  type PermissionRecipient,
  type PermissionRole,
} from '@openmobilehub/storage-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QK_FILE_PERMISSIONS } from '../client/queryKeys';

type MutationData = {
  fileId: string;
  role: PermissionRole;
  recipient: PermissionRecipient;
  sendNotificationEmail: boolean;
  emailMessage?: string;
};

export const useCreatePermissionMutation = (storageClient: IStorageClient) => {
  const queryClient = useQueryClient();

  return useMutation<Permission | void, StorageException, MutationData>({
    mutationFn: ({
      fileId,
      role,
      recipient,
      sendNotificationEmail,
      emailMessage,
    }) =>
      storageClient.createPermission(
        fileId,
        role,
        recipient,
        sendNotificationEmail,
        emailMessage
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QK_FILE_PERMISSIONS] });
    },
    retry: false,
  });
};
