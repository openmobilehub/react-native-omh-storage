import {
  IStorageClient,
  StorageEntityMetadata,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

import { QK_FILE_METADATA } from '../client/queryKeys';

export const useFileMetadataQuery = (
  storageClient: IStorageClient,
  fileId: string
) => {
  return useQuery<StorageEntityMetadata, StorageException>({
    queryKey: [QK_FILE_METADATA, fileId],
    queryFn: () => storageClient.getFileMetadata(fileId),
  });
};
