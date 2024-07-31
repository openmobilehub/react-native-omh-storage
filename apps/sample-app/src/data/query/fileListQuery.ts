import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useFileListQuery = (
  storageClient: IStorageClient,
  folderId: string
) => {
  return useQuery<StorageEntity[], StorageException>({
    queryKey: ['fileList', folderId],
    queryFn: () => storageClient.listFiles(folderId),
  });
};
