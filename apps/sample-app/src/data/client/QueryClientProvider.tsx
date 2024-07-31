import { ReactNode, useCallback, useMemo } from 'react';

import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

import { useAuthContext } from '@/contexts/auth/AuthContext';
import { getQueryClient } from '@/data/client/getQueryClient';
import { showError } from '@/utils/showError';

interface Props {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: Props) => {
  const { refreshToken, logout } = useAuthContext();

  const handleUnauthorizedError = useCallback(async () => {
    try {
      await refreshToken();
    } catch (error) {
      showError(error);
      logout();
    }
  }, [logout, refreshToken]);

  const client = useMemo(
    () => getQueryClient({ onUnauthorizedError: handleUnauthorizedError }),
    [handleUnauthorizedError]
  );

  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
};
