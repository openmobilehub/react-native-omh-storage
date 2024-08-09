import type { AccessType } from './AccessLevel';

export interface GroupMembershipInfo {
  access_type?: AccessType;
  group?: {
    group_id?: string;
    group_name?: string;
  };
  is_inherited?: boolean;
}
