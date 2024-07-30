import { ReactNode } from 'react';

import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import { StorageContextProvider } from '@/contexts/storage/StorageContext';

interface Props {
  children: ReactNode;
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <AuthContextProvider>
      <StorageContextProvider>{children}</StorageContextProvider>
    </AuthContextProvider>
  );
};
