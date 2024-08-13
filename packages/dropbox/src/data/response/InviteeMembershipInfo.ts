import type { AccessType } from './AccessLevel';
import type { UserInfo } from './UserInfo';

export interface InviteeMembershipInfo {
  access_type?: AccessType;
  invitee?: {
    email?: string;
  };
  is_inherited?: boolean;
  user?: UserInfo;
}
