import {
  FileVersion,
  IStorageClient,
  StorageException,
} from '@openmobilehub/storage-core';
import { useQuery } from '@tanstack/react-query';

import { QK_FILE_VERSIONS } from '../client/queryKeys';

export const useFileVersionsQuery = (
  storageClient: IStorageClient,
  fileId: string
) => {
  return useQuery<FileVersion[], StorageException>({
    queryKey: [QK_FILE_VERSIONS, fileId],
    queryFn: () => storageClient.getFileVersions(fileId),
  });
};
