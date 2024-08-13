import { ApiException, UserPermission } from '@openmobilehub/storage-core';

import type { UserMembershipInfo } from '../response/UserMembershipInfo';
import { mapAccessLevelToPermissionRole } from './mapAccessLevelToPermissionRole';

export const mapUserMembershipInfoToPermission = (
  info: UserMembershipInfo
): UserPermission => {
  const role = mapAccessLevelToPermissionRole(info.access_type?.['.tag']);
  const userId = info.user?.account_id;
  if (!role || !userId) {
    throw new ApiException('Invalid user membership info');
  }

  return new UserPermission({
    id: userId, // Dropbox identify permissions by member
    role: role,
    isInherited: info.is_inherited,
    userId: userId,
    displayName: info.user?.display_name,
    emailAddress: info.user?.email,
  });
};
