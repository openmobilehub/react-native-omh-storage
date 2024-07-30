abstract class OmhStorageException extends Error {
  constructor(message: string, cause?: Error) {
    super(message);

    this.name = this.constructor.name;
    this.cause = cause;
  }
}

export class InvalidCredentialsException extends OmhStorageException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
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
