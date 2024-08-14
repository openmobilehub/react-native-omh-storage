import {
  ApiException,
  InvalidCredentialsException,
  type IStorageAuthClient,
} from '@openmobilehub/storage-core';
import Axios, { AxiosError, type AxiosInstance } from 'axios';

import { BASE_URL } from './data/constants/constants';
import type { DropboxErrorResponse } from './data/error/DropboxErrorResponse';

export class DropboxStorageApiClient {
  axiosClient: AxiosInstance;

  constructor(authClient: IStorageAuthClient) {
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
    if (error.response?.data?.user_message?.text) {
      return error.response?.data?.user_message?.text;
    }
    if (error.response?.data?.error_summary) {
      return error.response?.data?.error_summary;
    }
    return error.message;
  }
}
