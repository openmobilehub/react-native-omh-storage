import {
  AnyonePermission,
  ApiException,
  DomainPermission,
  GroupPermission,
  Permission,
  UserPermission,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type {
  PermissionRemote,
  PermissionRoleRemote,
} from '../response/PermissionRemote';

export const mapPermissionRemoteToStoragePermission = (
  permission: PermissionRemote
): Permission => {
  const role = mapRoleRemoteToPermissionRole(permission.role);

  if (!permission.id || !permission.type || !role) {
    throw new ApiException('Invalid remote permission data');
  }

  const { id } = permission;

  const noInheritanceInformationProvided =
    !permission.permissionDetails || permission.permissionDetails.length === 0;

  const isInherited = noInheritanceInformationProvided
    ? undefined
    : permission.permissionDetails?.find((item) => item.inherited) !==
      undefined;

  const expirationTime = permission.expirationTime
    ? new Date(permission.expirationTime)
    : undefined;

  switch (permission.type) {
    case 'user':
      return new UserPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        userId: undefined,
        displayName: permission.displayName,
        emailAddress: permission.emailAddress,
        expirationTime: expirationTime,
        deleted: permission.deleted,
        photoLink: permission.photoLink,
        pendingOwner: permission.pendingOwner,
      });
    case 'group':
      return new GroupPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        groupId: undefined,
        displayName: permission.displayName,
        emailAddress: permission.emailAddress,
        expirationTime: expirationTime,
        deleted: permission.deleted,
      });
    case 'domain':
      return new DomainPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        displayName: permission.displayName,
        domain: permission.domain,
      });
    case 'anyone':
      return new AnyonePermission({
        id: id,
        role: role,
        isInherited: isInherited,
      });
    default:
      throw new ApiException('Invalid remote permission type');
  }
};

const mapRoleRemoteToPermissionRole = (
  remoteRole: PermissionRoleRemote | undefined
): PermissionRole | undefined => {
  switch (remoteRole) {
    case 'owner':
      return 'owner';
    case 'writer':
      return 'writer';
    case 'commenter':
      return 'commenter';
    case 'reader':
      return 'reader';
    default:
      return undefined;
  }
};
