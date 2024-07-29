import Axios, { AxiosError, type AxiosInstance } from 'axios';

import { ApiException } from './model/StorageException';

export class GoogleStorageApiClient {
  axiosClient: AxiosInstance;

  constructor() {
    // Setup axios
    this.axiosClient = Axios.create({
      baseURL: 'https://www.googleapis.com/',
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new ApiException(
          error.message,
          error.response?.status,
          error.cause
        );
      }
    );
  }

  setAccessToken(accessToken: string) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
