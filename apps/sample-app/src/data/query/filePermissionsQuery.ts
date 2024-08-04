import {
  IStorageClient,
  Permission,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useFilePermissionsQuery = (
  storageClient: IStorageClient,
  fileId: string
) => {
  return useQuery<Permission[], StorageException>({
    queryKey: ['filePermissions', fileId],
    queryFn: () => storageClient.getPermissions(fileId),
  });
};
