import { ApiException } from '@openmobilehub/storage-core';
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
  constructor() {
    super(BASE_URL);
  }

  setAccessToken(accessToken: string) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}

export class OneDriveStorageApiClientNoAuth extends BaseOneDriveStorageApiClient {
  constructor() {
    super(BASE_URL);
  }
}
