import { IStorageClient } from '@openmobilehub/storage-core';
import { GoogleDriveStorageClient } from '@openmobilehub/storage-googledrive';

import { Provider } from '@/constants/provider';

export const getStorageProvider = (provider: Provider): IStorageClient => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return new GoogleDriveStorageClient();
    case Provider.ONEDRIVE:
      throw new Error('OneDrive is not supported yet');
    case Provider.DROPBOX:
      throw new Error('Dropbox is not supported yet');
  }
};
