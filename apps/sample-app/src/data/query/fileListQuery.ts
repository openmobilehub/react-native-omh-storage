import { useQuery } from '@tanstack/react-query';

import { StorageClient } from '../../../../../packages/googledrive/src/model/StorageClient';
import { StorageEntity } from '../../../../../packages/googledrive/src/model/StorageEntity';
import { OmhStorageException } from '../../../../../packages/googledrive/src/model/StorageException';

export const useFileListQuery = (
  storageClient: StorageClient,
  folderId: string
) =>
  useQuery<StorageEntity[], OmhStorageException>({
    queryKey: ['fileList', folderId],
    queryFn: () => storageClient.listFiles(folderId),
  });
