import { ApiException } from '@openmobilehub/storage-core';
import Axios, { AxiosError, type AxiosInstance } from 'axios';

import { BASE_URL } from './data/constants/constants';

export class GoogleStorageApiClient {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = Axios.create({
      baseURL: BASE_URL,
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        Promise.reject(
          new ApiException(error.message, error.response?.status, error)
        );
      }
    );
  }

  setAccessToken(accessToken: string) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
