import {
  CreateAnyonePermission,
  CreateDomainPermission,
  CreateGroupPermission,
  CreatePermission,
  CreateUserPermission,
  UnsupportedOperationException,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type { CreatePermissionRequestBody } from '../body/CreatePermissionRequestBody';
import type { PermissionRoleRemote } from '../response/PermissionRemote';

export const mapCreatePermissionToRequestBody = (
  createPermission: CreatePermission
): CreatePermissionRequestBody => {
  const role = mapPermissionRoleToRoleRemote(createPermission.role);

  if (createPermission instanceof CreateUserPermission) {
    return {
      type: 'user',
      role: role,
      emailAddress: createPermission.emailAddress,
    };
  }

  if (createPermission instanceof CreateGroupPermission) {
    return {
      type: 'group',
      role: role,
      emailAddress: createPermission.emailAddress,
    };
  }

  if (createPermission instanceof CreateDomainPermission) {
    return {
      type: 'domain',
      role: role,
      domain: createPermission.domain,
    };
  }

  if (createPermission instanceof CreateAnyonePermission) {
    return {
      type: 'anyone',
      role: role,
    };
  }

  throw new UnsupportedOperationException();
};

export const mapPermissionRoleToRoleRemote = (
  remoteRole: PermissionRole
): PermissionRoleRemote => {
  switch (remoteRole) {
    case 'owner':
      return 'owner';
    case 'writer':
      return 'writer';
    case 'commenter':
      return 'commenter';
    case 'reader':
      return 'reader';
  }
};
