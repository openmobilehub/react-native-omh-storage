import {
  OmhStorageException,
  StorageClient,
  StorageEntity,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useFileListQuery = (
  storageClient: StorageClient,
  folderId: string
) =>
  useQuery<StorageEntity[], OmhStorageException>({
    queryKey: ['fileList', folderId],
    queryFn: () => storageClient.listFiles(folderId),
  });
