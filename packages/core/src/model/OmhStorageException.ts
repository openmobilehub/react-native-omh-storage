export abstract class OmhStorageException extends Error {
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

export class OmhInvalidCredentialsException extends OmhStorageException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class OmhDeveloperErrorException extends OmhStorageException {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class OmhApiException extends OmhStorageException {
  code?: number;

  constructor(message: string, code?: number, cause?: Error) {
    super(message, cause);
    this.code = code;
  }
}
