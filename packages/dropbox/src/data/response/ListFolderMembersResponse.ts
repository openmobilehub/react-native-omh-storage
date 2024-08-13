import type { GroupMembershipInfo } from './GroupMembershipInfo';
import type { UserMembershipInfo } from './UserMembershipInfo';

export interface ListFolderMembersResponse {
  groups?: GroupMembershipInfo[];
  invitees?: UserMembershipInfo[];
  users?: UserMembershipInfo[];
}
