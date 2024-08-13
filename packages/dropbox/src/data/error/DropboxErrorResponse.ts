export type DropboxErrorResponse =
  | string
  | {
      error_summary?: string;
      user_message?: {
        text?: string;
      };
    };
