export class OmhStorageException extends Error {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = this.constructor.name;
    this.cause = cause;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class InvalidCredentialsException extends OmhStorageException {
  constructor(message: string) {
    super(message);
  }
}

export class DeveloperErrorException extends OmhStorageException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class ApiException extends OmhStorageException {
  code?: number;

  constructor(message: string, code?: number, cause?: Error) {
    super(message, cause);
    this.code = code;
  }
}
