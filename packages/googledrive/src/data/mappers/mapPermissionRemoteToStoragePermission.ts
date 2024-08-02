import {
  AnyoneIdentity,
  ApiException,
  DomainIdentity,
  GroupIdentity,
  StoragePermission,
  UserIdentity,
  type Identity,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type { PermissionRemote } from '../response/PermissionRemote';

export const mapPermissionRemoteToStoragePermission = (
  permissionRemote: PermissionRemote
): StoragePermission => {
  let role = mapRoleRemoteToPermissionRole(permissionRemote.role);
  let identity = mapPermissionRemoteToIdentity(permissionRemote);

  if (!permissionRemote.id || !permissionRemote.type || !role || !identity) {
    throw new ApiException('Invalid remote permission data');
  }

  let noInheritanceInformationProvided =
    !permissionRemote.permissionDetails ||
    permissionRemote.permissionDetails.length === 0;

  let isInherited =
    permissionRemote.permissionDetails?.find((item) => item.inheritedFrom) !==
    undefined;

  return new StoragePermission({
    id: permissionRemote.id,
    role: role,
    isInherited: noInheritanceInformationProvided ? undefined : isInherited,
    identity: identity,
  });
};

const mapRoleRemoteToPermissionRole = (
  remoteRole: String | undefined
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

export const mapPermissionRemoteToIdentity = (
  permission: PermissionRemote
): Identity | undefined => {
  const expirationTime = permission.expirationTime
    ? new Date(permission.expirationTime)
    : undefined;

  switch (permission.type) {
    case 'user':
      return new UserIdentity({
        id: undefined,
        displayName: permission.displayName,
        emailAddress: permission.emailAddress,
        expirationTime: expirationTime,
        deleted: permission.deleted,
        photoLink: permission.photoLink,
        pendingOwner: permission.pendingOwner,
      });
    case 'group':
      return new GroupIdentity({
        id: undefined,
        displayName: permission.displayName,
        emailAddress: permission.emailAddress,
        expirationTime: expirationTime,
        deleted: permission.deleted,
      });
    case 'domain':
      return new DomainIdentity({
        displayName: permission.displayName,
        domain: permission.domain,
      });
    case 'anyone':
      return new AnyoneIdentity();
    default:
      return undefined;
  }
};
