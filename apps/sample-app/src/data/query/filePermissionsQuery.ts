import {
  IStorageClient,
  Permission,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

import { QK_FILE_PERMISSIONS } from '@/data/client/queryKeys';

export const useFilePermissionsQuery = (
  storageClient: IStorageClient,
  fileId: string
) => {
  return useQuery<Permission[], StorageException>({
    queryKey: [QK_FILE_PERMISSIONS, fileId],
    queryFn: () => storageClient.getPermissions(fileId),
  });
};
