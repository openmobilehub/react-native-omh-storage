import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useSearchFilesQuery = (
  storageClient: IStorageClient,
  query: string
) => {
  return useQuery<StorageEntity[], StorageException>({
    queryKey: ['fileList', 'search', query],
    queryFn: () => storageClient.search(query),
  });
};
