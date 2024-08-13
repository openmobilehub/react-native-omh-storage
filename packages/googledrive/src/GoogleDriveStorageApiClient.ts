import {
  ApiException,
  InvalidCredentialsException,
  type StorageAuthClient,
} from '@openmobilehub/storage-core';
import Axios, { AxiosError, type AxiosInstance } from 'axios';

import { BASE_URL } from './data/constants/constants';
import type { GoogleErrorResponse } from './data/error/GoogleErrorResponse';

export class GoogleDriveStorageApiClient {
  axiosClient: AxiosInstance;

  constructor(authClient: StorageAuthClient) {
    this.axiosClient = Axios.create({
      baseURL: BASE_URL,
    });

    this.axiosClient.interceptors.request.use(async (config) => {
      const accessToken = await authClient.getAccessToken();
      if (!accessToken) {
        throw new InvalidCredentialsException('Access token is not available');
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError<GoogleErrorResponse>) => {
        throw new ApiException(
          error.response?.data?.error?.message || error.message,
          error.response?.status,
          error
        );
      }
    );
  }
}
