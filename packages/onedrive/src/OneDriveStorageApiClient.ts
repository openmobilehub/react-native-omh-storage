import {
  ApiException,
  InvalidCredentialsException,
  type IStorageAuthClient,
} from '@openmobilehub/storage-core';
import Axios, { AxiosError, type AxiosInstance } from 'axios';

import { BASE_URL } from './data/constants/constants';
import type { OneDriveErrorResponse } from './data/error/OneDriveErrorResponse';

abstract class BaseOneDriveStorageApiClient {
  axiosClient: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosClient = Axios.create({
      baseURL: baseURL,
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError<OneDriveErrorResponse>) => {
        throw new ApiException(
          this.getErrorMessage(error),
          error.response?.status,
          error
        );
      }
    );
  }

  private getErrorMessage(error: AxiosError<OneDriveErrorResponse>) {
    if (error.response?.data?.error?.message) {
      return error.response.data.error.message;
    }
    return error.message;
  }
}

export class OneDriveStorageApiClient extends BaseOneDriveStorageApiClient {
  constructor(authClient: IStorageAuthClient) {
    super(BASE_URL);

    this.axiosClient.interceptors.request.use(async (config) => {
      const accessToken = await authClient.getAccessToken();
      if (!accessToken) {
        throw new InvalidCredentialsException('Access token is not available');
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }
}

export class OneDriveStorageApiClientNoAuth extends BaseOneDriveStorageApiClient {
  constructor() {
    super(BASE_URL);
  }
}
