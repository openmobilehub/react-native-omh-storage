import { OmhApiException } from '@openmobilehub/storage-core';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { showError } from '@/utils/showError';

interface QueryClientOptions {
  onUnauthorizedError: () => void;
}

const handleRetry = (failureCount: number, error: OmhApiException) => {
  if (error instanceof OmhApiException) {
    if (error.code === 401) {
      // If the error is a 401, we don't want to retry query
      return false;
    }
  }
  return failureCount < 3;
};

export const getQueryClient = ({ onUnauthorizedError }: QueryClientOptions) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: handleRetry,
      },
      mutations: {
        retry: handleRetry,
      },
    },
    queryCache: new QueryCache({
      onError: async (error, query) => {
        if (error instanceof OmhApiException) {
          if (error.code === 401) {
            await onUnauthorizedError();
            query.invalidate();
            return;
          }
        }
        showError(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: async (error) => {
        if (error instanceof OmhApiException) {
          if (error.code === 401) {
            await onUnauthorizedError();
            return;
          }
        }
        showError(error);
      },
    }),
  });