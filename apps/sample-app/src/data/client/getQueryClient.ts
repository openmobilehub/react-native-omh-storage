import { Alert } from 'react-native';

import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { ApiException } from '../../../../../packages/googledrive/src/model/StorageException';

interface QueryClientOptions {
  onUnauthorizedError: () => void;
}

export const getQueryClient = ({ onUnauthorizedError }: QueryClientOptions) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (error instanceof ApiException) {
            if (error.code === 401) {
              // If the error is a 401, we don't want to retry
              return false;
            }
          }
          return failureCount < 3;
        },
      },
    },
    queryCache: new QueryCache({
      onError: async (error, query) => {
        if (error instanceof ApiException) {
          if (error.code === 401) {
            await onUnauthorizedError();
            query.invalidate();
            return;
          }
        }
        Alert.alert('Error', JSON.stringify(error));
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        Alert.alert('Error', error.message);
      },
    }),
  });
