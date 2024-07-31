import { IStorageClient } from '@openmobilehub/storage-core';
import { GoogleStorageClient } from '@openmobilehub/storage-googledrive';

import { Provider } from '@/constants/Provider';

export const getStorageProvider = (provider: Provider): IStorageClient => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return new GoogleStorageClient();
    case Provider.ONEDRIVE:
      throw new Error('OneDrive is not supported yet');
    case Provider.DROPBOX:
      throw new Error('Dropbox is not supported yet');
  }
};
