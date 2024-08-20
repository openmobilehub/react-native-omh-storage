import { Alert } from 'react-native';

type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
};

const getErrorMessage = (error: unknown) => {
  // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
  return toErrorWithMessage(error).message;
};

export const showError = (error: unknown) => {
  showErrorMessage(getErrorMessage(error));
};

export const showErrorMessage = (message: string) => {
  Alert.alert('Error', message);
};
