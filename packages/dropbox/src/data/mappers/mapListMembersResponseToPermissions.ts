import { Permission } from '@openmobilehub/storage-core';

import type { ListMembersResponse } from '../response/ListMembersResponse';
import { mapGroupMembershipInfoToPermission } from './mapGroupMembershipInfoToPermission';
import { mapInviteeMembershipInfoToPermission } from './mapInviteeMembershipInfoToPermission';
import { mapUserMembershipInfoToPermission } from './mapUserMembershipInfoToPermission';

export const mapListMembersResponseToPermissions = (
  response: ListMembersResponse
): Permission[] => {
  let usersPermissions: Permission[] =
    response.users?.map(mapUserMembershipInfoToPermission) || [];
  let groupsPermissions: Permission[] =
    response.groups?.map(mapGroupMembershipInfoToPermission) || [];
  let inviteesPermissions: Permission[] =
    response.invitees?.map(mapInviteeMembershipInfoToPermission) || [];

  return [...inviteesPermissions, ...usersPermissions, ...groupsPermissions];
};
