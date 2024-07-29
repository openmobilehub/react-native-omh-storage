import { useContext } from 'react';

import { StorageContext } from './StorageContext';

export const useRequireStorageClient = () => {
  const context = useContext(StorageContext);
  if (context?.storageClient == null) {
    throw new Error('Storage client was not initialized');
  }
  return context.storageClient;
};
