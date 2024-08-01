export abstract class StorageException extends Error {
  constructor(
    message: string,
    public cause?: Error
  ) {
    // @ts-ignore - this is a workaround for a bug in the TypeScript compiler
    super(message, cause);

    this.name = this.constructor.name;
    this.cause = cause;
  }
}

export class InvalidCredentialsException extends StorageException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class DeveloperErrorException extends StorageException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class ApiException extends StorageException {
  code?: number;

  constructor(message: string, code?: number, cause?: Error) {
    super(message, cause);
    this.code = code;
  }
}

export class UnsupportedOperationException extends Error {
  constructor() {
    super('This operation is not supported for selected provider!');
  }
}
