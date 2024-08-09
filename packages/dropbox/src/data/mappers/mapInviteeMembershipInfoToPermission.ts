import { ApiException, UserPermission } from '@openmobilehub/storage-core';

import type { InviteeMembershipInfo } from '../response/InviteeMembershipInfo';
import { mapAccessLevelToPermissionRole } from './mapAccessLevelToPermissionRole';

export const mapInviteeMembershipInfoToPermission = (
  info: InviteeMembershipInfo
): UserPermission => {
  const role = mapAccessLevelToPermissionRole(info.access_type?.['.tag']);
  const inviteeEmail = info.invitee?.email;
  const userId = info.user?.account_id || inviteeEmail;
  if (!role || !userId) {
    throw new ApiException('Invalid invitee membership info');
  }

  return new UserPermission({
    id: userId, // Dropbox identify permissions by member
    role: role,
    isInherited: info.is_inherited,
    userId: userId,
    displayName: info.user?.display_name,
    emailAddress: info.user?.email || inviteeEmail,
  });
};
