import { ReactNode } from 'react';

import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import { StorageContextProvider } from '@/contexts/storage/StorageContext';

import { SnackbarContextProvider } from '../snackbar/SnackbarContent';
import { UIContextProvider } from '../ui/UIContext';

interface Props {
  children: ReactNode;
}

export const ContextsProvider = ({ children }: Props) => {
  return (
    <AuthContextProvider>
      <StorageContextProvider>
        <UIContextProvider>
          <SnackbarContextProvider>{children}</SnackbarContextProvider>
        </UIContextProvider>
      </StorageContextProvider>
    </AuthContextProvider>
  );
};
