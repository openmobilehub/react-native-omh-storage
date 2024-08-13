import type { AccessType } from './AccessLevel';
import type { UserInfo } from './UserInfo';

export interface UserMembershipInfo {
  access_type?: AccessType;
  user?: UserInfo;
  is_inherited?: boolean;
}
