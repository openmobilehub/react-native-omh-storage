export type AccessLevel =
  | 'owner'
  | 'editor'
  | 'viewer'
  | 'viewer_no_comment'
  | 'traverse'
  | 'no_access';

export interface AccessType {
  '.tag'?: AccessLevel;
}
