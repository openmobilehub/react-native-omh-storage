import { GoogleStorageClient } from '@openmobilehub/storage-googledrive';

import { Provider } from '@/constants/provider';

import { StorageClient } from '../../../../../packages/googledrive/src/model/StorageClient';

export const getStorageProvider = (provider: Provider): StorageClient => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return new GoogleStorageClient();
    case Provider.ONEDRIVE:
      throw new Error('OneDrive is not supported yet');
    case Provider.DROPBOX:
      throw new Error('Dropbox is not supported yet');
  }
};
