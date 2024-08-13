import {
  ApiException,
  GroupPermission,
  UserPermission,
} from '@openmobilehub/storage-core';

import type { GroupMembershipInfo } from '../response/GroupMembershipInfo';
import { mapAccessLevelToPermissionRole } from './mapAccessLevelToPermissionRole';

export const mapGroupMembershipInfoToPermission = (
  info: GroupMembershipInfo
): UserPermission => {
  const role = mapAccessLevelToPermissionRole(info.access_type?.['.tag']);
  const groupId = info.group?.group_id;
  if (!role || !groupId) {
    throw new ApiException('Invalid group membership info');
  }

  return new GroupPermission({
    id: groupId, // Dropbox identify permissions by member
    role: role,
    isInherited: info.is_inherited,
    groupId: groupId,
    displayName: info.group?.group_name,
  });
};
