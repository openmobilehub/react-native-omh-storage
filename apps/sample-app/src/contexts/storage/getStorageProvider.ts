import { IStorageClient } from '@openmobilehub/storage-core';
import { DropboxStorageClient } from '@openmobilehub/storage-dropbox';
import { GoogleDriveStorageClient } from '@openmobilehub/storage-googledrive';
import { OneDriveStorageClient } from '@openmobilehub/storage-onedrive';

import { Provider } from '@/constants/provider';
import { AuthProvider } from '@/types/AuthProvider';

export const getStorageProvider = (
  provider: Provider,
  authProvider: AuthProvider
): IStorageClient => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return new GoogleDriveStorageClient(authProvider);
    case Provider.ONEDRIVE:
      return new OneDriveStorageClient(authProvider);
    case Provider.DROPBOX:
      return new DropboxStorageClient(authProvider);
  }
};
