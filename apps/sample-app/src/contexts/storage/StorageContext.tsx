import { createContext, ReactNode, useContext, useMemo } from 'react';

import { IStorageClient } from '@openmobilehub/storage-core';

import { useAuthContext } from '../auth/AuthContext';
import { getStorageProvider } from './getStorageProvider';

type StorageContextValue = {
  storageClient: IStorageClient | null;
} | null;

export const StorageContext = createContext<StorageContextValue>(null);

interface Props {
  children: ReactNode;
}

export const StorageContextProvider = ({ children }: Props) => {
  const { provider, authProvider } = useAuthContext();

  const storageClient = useMemo(() => {
    if (provider == null || authProvider == null) {
      return null;
    }

    const storageProvider = getStorageProvider(provider, authProvider);

    return storageProvider;
  }, [provider, authProvider]);

  return (
    <StorageContext.Provider value={{ storageClient }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (context == null) {
    throw new Error(
      'useStorageContext must be used within a StorageContextProvider'
    );
  }

  return context;
};
