import {
  AnyonePermission,
  ApiException,
  ApplicationPermission,
  DevicePermission,
  DomainPermission,
  GroupPermission,
  Permission,
  UserPermission,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type { NativePermission } from '../StorageClient.nativeTypes';

export const mapNativePermissions = (
  nativePermission: NativePermission
): Permission => {
  const role = mapNativeRole(nativePermission.role);

  if (!nativePermission.id || !nativePermission.type || !role) {
    throw new ApiException('Invalid native permission data');
  }

  const {
    id,
    isInherited,
    userId,
    displayName,
    emailAddress,
    deleted,
    photoLink,
    pendingOwner,
    domain,
    groupId,
    deviceId,
    applicationId,
  } = nativePermission;

  const expirationTime = nativePermission.expirationTime
    ? new Date(nativePermission.expirationTime)
    : undefined;

  switch (nativePermission.type) {
    case 'user':
      return new UserPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        userId: userId,
        displayName: displayName,
        emailAddress: emailAddress,
        expirationTime: expirationTime,
        deleted: deleted,
        photoLink: photoLink,
        pendingOwner: pendingOwner,
      });
    case 'group':
      return new GroupPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        groupId: groupId,
        displayName: displayName,
        emailAddress: emailAddress,
        expirationTime: expirationTime,
        deleted: deleted,
      });
    case 'domain':
      return new DomainPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        displayName: displayName,
        domain: domain,
      });
    case 'anyone':
      return new AnyonePermission({
        id: id,
        role: role,
        isInherited: isInherited,
      });
    case 'device':
      return new DevicePermission({
        id: id,
        role: role,
        isInherited: isInherited,
        deviceId: deviceId,
        displayName: displayName,
        expirationTime: expirationTime,
      });
    case 'application':
      return new ApplicationPermission({
        id: id,
        role: role,
        isInherited: isInherited,
        applicationId: applicationId,
        displayName: displayName,
        expirationTime: expirationTime,
      });
    default:
      throw new ApiException('Invalid remote permission type');
  }
};

const mapNativeRole = (
  nativeRole: string | undefined
): PermissionRole | undefined => {
  switch (nativeRole) {
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
