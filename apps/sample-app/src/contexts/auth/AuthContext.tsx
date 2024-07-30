import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Provider } from '@/constants/provider';
import { SIGNED_WITH_PROVIDER } from '@/storage/keys';
import storage from '@/storage/storage';
import { AuthProvider } from '@/types/AuthProvider';
import { showError } from '@/utils/showError';

import { initAuthClient } from './getAuthProvider';

type InitializationStatus = 'idle' | 'initializing' | 'error' | 'success';

type AuthContextValue = {
  accessToken: string | null;
  initializationStatus: InitializationStatus;
  provider: Provider | null;
  login(provider: Provider): Promise<void>;
  logout(): Promise<void>;
  refreshToken(): Promise<void>;
  retrieveAuthProvider(): Promise<void>;
} | null;

export const AuthContext = createContext<AuthContextValue>(null);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [provider, setProvider] = useState<Provider | null>(null);

  const [authProvider, setAuthProvider] = useState<AuthProvider | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [initializationStatus, setInitializationStatus] =
    useState<InitializationStatus>('idle');

  const logout = useCallback(async () => {
    authProvider?.signOut();

    setAuthProvider(null);
    setAccessToken(null);

    storage.delete(SIGNED_WITH_PROVIDER);
  }, [authProvider]);

  const login = useCallback(
    async (withProvider: Provider) => {
      const initializedAuthProvider = await initAuthClient(withProvider);

      try {
        await initializedAuthProvider.signIn();
      } catch (error) {
        return showError(error);
      }

      const token = await initializedAuthProvider.getAccessToken();

      if (!token) {
        showError(new Error('Access token is not available after sign in'));
        return logout();
      }

      setAccessToken(token);
      setAuthProvider(initializedAuthProvider);
      setProvider(withProvider);

      storage.set(SIGNED_WITH_PROVIDER, withProvider);
    },
    [logout]
  );

  const refreshToken = useCallback(async () => {
    if (!authProvider) {
      showError(new Error('No auth provider found!'));
      return;
    }

    const refreshedAccessToken = await authProvider.refreshAccessToken();

    if (!refreshedAccessToken) {
      showError(new Error('Failed to refresh access token'));
      return;
    }

    setAccessToken(refreshedAccessToken);
  }, [authProvider]);

  const retrieveAuthProvider = useCallback(async () => {
    setInitializationStatus('initializing');

    const storedProvider = storage.getString(SIGNED_WITH_PROVIDER) as
      | Provider
      | undefined;

    if (!storedProvider) {
      setInitializationStatus('success');
      return;
    }

    const initializedAuthProvider = await initAuthClient(storedProvider);
    const token = await initializedAuthProvider.getAccessToken();

    if (!token) {
      setInitializationStatus('error');
      showError(new Error('Access token is not available after sign in'));
      return logout();
    }

    setAccessToken(token);
    setAuthProvider(initializedAuthProvider);
    setProvider(storedProvider);

    setInitializationStatus('success');
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        provider,
        login,
        logout,
        refreshToken,
        retrieveAuthProvider,
        initializationStatus,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};
