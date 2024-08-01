import {
  IStorageClient,
  StorageEntity,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

import { QK_LIST_FILES } from '../client/queryKeys';

export const useFileListQuery = (
  storageClient: IStorageClient,
  folderId: string
) => {
  return useQuery<StorageEntity[], StorageException>({
    queryKey: [QK_LIST_FILES, folderId],
    queryFn: () => storageClient.listFiles(folderId),
  });
};
