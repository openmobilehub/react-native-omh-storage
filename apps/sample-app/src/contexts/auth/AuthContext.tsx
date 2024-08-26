import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { unstable_batchedUpdates } from 'react-native';

import { Provider } from '@/constants/provider';
import { SIGNED_WITH_PROVIDER } from '@/storage/keys';
import storage from '@/storage/storage';
import { AuthClient } from '@/types/AuthClient';
import { showError } from '@/utils/showError';

import { initAuthClient } from './getAuthClient';

type InitializationStatus = 'idle' | 'initializing' | 'error' | 'success';

type AuthContextValue = {
  authClient: AuthClient | null;
  initializationStatus: InitializationStatus;
  provider: Provider | null;
  login(provider: Provider): Promise<void>;
  logout(): Promise<void>;
  refreshToken(): Promise<void>;
  silentLogin(): Promise<void>;
} | null;

export const AuthContext = createContext<AuthContextValue>(null);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [initializationStatus, setInitializationStatus] =
    useState<InitializationStatus>('idle');

  const logout = useCallback(async () => {
    authClient?.signOut();

    setAuthClient(null);

    await storage.delete(SIGNED_WITH_PROVIDER);
  }, [authClient]);

  const login = useCallback(
    async (withProvider: Provider) => {
      const initializedAuthClient = await initAuthClient(withProvider);

      try {
        await initializedAuthClient.signIn();
      } catch (error) {
        return showError(error);
      }

      const token = await initializedAuthClient.getAccessToken();

      if (!token) {
        showError(new Error('Access token is not available after sign in'));
        return logout();
      }

      // The updates supposed to be batched by default, but some reasons it does not always work.
      // This is a workaround to make sure the updates are batched.
      unstable_batchedUpdates(() => {
        setProvider(withProvider);
        setAuthClient(initializedAuthClient);
      });

      await storage.set(SIGNED_WITH_PROVIDER, withProvider);
    },
    [logout]
  );

  const refreshToken = useCallback(async () => {
    if (!authClient) {
      showError(new Error('No auth provider found!'));
      return;
    }

    const refreshedAccessToken = await authClient.refreshAccessToken();

    if (!refreshedAccessToken) {
      showError(new Error('Failed to refresh access token'));
    }
  }, [authClient]);

  const silentLogin = useCallback(async () => {
    setInitializationStatus('initializing');

    const storedProvider = (await storage.get(SIGNED_WITH_PROVIDER)) as
      | Provider
      | undefined;

    if (!storedProvider) {
      setInitializationStatus('success');
      return;
    }

    const initializedAuthClient = await initAuthClient(storedProvider);
    const token = await initializedAuthClient.getAccessToken();

    if (!token) {
      setInitializationStatus('error');
      showError(new Error('Access token is not available after sign in'));
      return logout();
    }

    // The updates supposed to be batched by default, but some reasons it does not always work.
    // This is a workaround to make sure the updates are batched.
    unstable_batchedUpdates(() => {
      setAuthClient(initializedAuthClient);
      setProvider(storedProvider);
    });

    setInitializationStatus('success');
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        authClient,
        provider,
        login,
        logout,
        refreshToken,
        silentLogin,
        initializationStatus,
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
