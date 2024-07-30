import {
  IOmhStorageClient,
  OmhStorageEntity,
  OmhStorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

export const useFileListQuery = (
  storageClient: IOmhStorageClient,
  folderId: string
) => {
  return useQuery<OmhStorageEntity[], OmhStorageException>({
    queryKey: ['fileList', folderId],
    queryFn: () => storageClient.listFiles(folderId),
  });
};
