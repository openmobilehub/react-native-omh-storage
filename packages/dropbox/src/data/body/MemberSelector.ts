export type MemberSelector =
  | {
      '.tag': 'email';
      'email': string;
    }
  | {
      '.tag': 'dropbox_id';
      'dropbox_id': string;
    };
