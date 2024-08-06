import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

import { QK_LIST_FILES, QK_SEARCH_FILES } from '../client/queryKeys';

export const useSearchFilesQuery = (
  storageClient: IStorageClient,
  query: string,
  enabled = true
) => {
  return useQuery<StorageEntity[], StorageException>({
    queryKey: [QK_LIST_FILES, QK_SEARCH_FILES, query],
    queryFn: () => storageClient.search(query),
    enabled,
  });
};
