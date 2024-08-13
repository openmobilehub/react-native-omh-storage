import { IStorageClient } from '@openmobilehub/storage-core';
import { DropboxStorageClient } from '@openmobilehub/storage-dropbox';
import { GoogleDriveStorageClient } from '@openmobilehub/storage-googledrive';
import { OneDriveStorageClient } from '@openmobilehub/storage-onedrive';

import { Provider } from '@/constants/provider';
import { AuthClient } from '@/types/AuthClient';

export const getStorageClient = (
  provider: Provider,
  authClient: AuthClient
): IStorageClient => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return new GoogleDriveStorageClient(authClient);
    case Provider.ONEDRIVE:
      return new OneDriveStorageClient(authClient);
    case Provider.DROPBOX:
      return new DropboxStorageClient(authClient);
  }
};
