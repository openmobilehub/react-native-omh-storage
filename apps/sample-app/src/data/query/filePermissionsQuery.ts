import {
  IStorageClient,
  StorageException,
  StoragePermission,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useFilePermissionsQuery = (
  storageClient: IStorageClient,
  fileId: string
) => {
  return useQuery<StoragePermission[], StorageException>({
    queryKey: ['filePermissions', fileId],
    queryFn: () => storageClient.getPermissions(fileId),
  });
};
