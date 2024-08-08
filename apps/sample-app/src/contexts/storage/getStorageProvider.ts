import { IStorageClient } from '@openmobilehub/storage-core';
import { DropboxStorageClient } from '@openmobilehub/storage-dropbox';
import { GoogleDriveStorageClient } from '@openmobilehub/storage-googledrive';
import { OneDriveStorageClient } from '@openmobilehub/storage-onedrive';

import { Provider } from '@/constants/provider';

export const getStorageProvider = (provider: Provider): IStorageClient => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return new GoogleDriveStorageClient();
    case Provider.ONEDRIVE:
      return new OneDriveStorageClient();
    case Provider.DROPBOX:
      return new DropboxStorageClient();
  }
};
