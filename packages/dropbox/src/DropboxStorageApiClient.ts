import { ApiException } from '@openmobilehub/storage-core';
import Axios, { AxiosError, type AxiosInstance } from 'axios';

import { BASE_URL } from './data/constants/constants';
import type { DropboxErrorResponse } from './data/error/DropboxErrorResponse';

export class DropboxStorageApiClient {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = Axios.create({
      baseURL: BASE_URL,
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError<DropboxErrorResponse>) => {
        throw new ApiException(
          this.getErrorMessage(error),
          error.response?.status,
          error
        );
      }
    );
  }

  private getErrorMessage(error: AxiosError<DropboxErrorResponse>) {
    if (typeof error.response?.data === 'string') {
      return error.response?.data;
    }
    if (typeof error.response?.data?.errorSummary === 'string') {
      return error.response?.data.errorSummary;
    }
    return error.message;
  }

  setAccessToken(accessToken: string) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  getAccessToken(): string {
    return (
      this.axiosClient.defaults.headers.common.Authorization?.toString() ?? ''
    );
  }
}
