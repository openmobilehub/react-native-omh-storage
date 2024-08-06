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
          error.response?.data || error.message,
          error.response?.status,
          error
        );
      }
    );
  }

  setAccessToken(accessToken: string) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
