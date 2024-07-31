import {
  IStorageClient,
  StorageEntityMetadata,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useFileMetadataQuery = (
  storageClient: IStorageClient,
  fileId: string
) => {
  return useQuery<StorageEntityMetadata, StorageException>({
    queryKey: ['fileMetadata', fileId],
    queryFn: () => storageClient.getFileMetadata(fileId),
  });
};
