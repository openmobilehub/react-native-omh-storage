import {
  ApiException,
  DeveloperErrorException,
  InvalidCredentialsException,
} from '../model';
import type { NativeStorageException } from '../StorageClient.nativeTypes';

const isNativeStorageException = (
  maybeStorageException: any
): maybeStorageException is NativeStorageException => {
  return (
    maybeStorageException !== null &&
    typeof maybeStorageException === 'object' &&
    Array.isArray(maybeStorageException.nativeStackAndroid) &&
    'userInfo' in maybeStorageException
  );
};

export const mapNativeException = (exception: any) => {
  if (exception instanceof Error === false) {
    return Error('Unknown error');
  }

  if (!isNativeStorageException(exception)) {
    return exception;
  }

  if (
    exception.userInfo.type === 'ApiException' &&
    exception.userInfo.statusCode
  ) {
    return new ApiException(
      exception.userInfo.message,
      exception.userInfo.statusCode
    );
  }

  if (exception.userInfo.type === 'DeveloperErrorException') {
    return new DeveloperErrorException(exception.userInfo.message, exception);
  }

  if (exception.userInfo.type === 'InvalidCredentialsException') {
    return new InvalidCredentialsException(
      exception.userInfo.message,
      exception
    );
  }

  return exception;
};
