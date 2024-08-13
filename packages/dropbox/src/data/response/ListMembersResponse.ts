import type { GroupMembershipInfo } from './GroupMembershipInfo';
import type { InviteeMembershipInfo } from './InviteeMembershipInfo';
import type { UserMembershipInfo } from './UserMembershipInfo';

export interface ListMembersResponse {
  groups?: GroupMembershipInfo[];
  invitees?: InviteeMembershipInfo[];
  users?: UserMembershipInfo[];
}
