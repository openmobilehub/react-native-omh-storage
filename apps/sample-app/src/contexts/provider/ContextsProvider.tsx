import { ReactNode } from 'react';

import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import { StorageContextProvider } from '@/contexts/storage/StorageContext';

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextsProvider = ({ children }: ContextProviderProps) => {
  return (
    <AuthContextProvider>
      <StorageContextProvider>{children}</StorageContextProvider>
    </AuthContextProvider>
  );
};
