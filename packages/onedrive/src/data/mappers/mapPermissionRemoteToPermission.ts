import {
  ApiException,
  ApplicationPermission,
  DevicePermission,
  GroupPermission,
  Permission,
  UserPermission,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type {
  Identity,
  PermissionRemote,
  PermissionRoleRemote,
} from '../response/PermissionRemote';

export const mapPermissionRemoteToPermission = (
  permissionRemote: PermissionRemote
): Permission => {
  const id = permissionRemote.id;
  const role = mapRemoteRoleToRole(permissionRemote.roles);

  if (!id || !role) {
    throw new ApiException('Invalid remote drive item data');
  }

  const expirationDateTime = permissionRemote.expirationDateTime
    ? new Date(permissionRemote.expirationDateTime)
    : undefined;

  const isInherited: boolean = !!permissionRemote.inheritedFrom?.id;

  if (permissionRemote.grantedToV2?.user) {
    return createUserPermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedToV2?.user
    );
  } else if (permissionRemote.grantedToV2?.group) {
    return createGroupPermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedToV2?.group
    );
  } else if (permissionRemote.grantedToV2?.device) {
    return createDevicePermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedToV2?.device
    );
  } else if (permissionRemote.grantedToV2?.application) {
    return createApplicationPermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedToV2?.application
    );
  } else if (permissionRemote.grantedTo?.user) {
    return createUserPermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedTo?.user
    );
  } else if (permissionRemote.grantedTo?.device) {
    return createDevicePermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedTo?.device
    );
  } else if (permissionRemote.grantedTo?.application) {
    return createApplicationPermission(
      id,
      role,
      expirationDateTime,
      isInherited,
      permissionRemote.grantedTo?.application
    );
  } else {
    throw new ApiException('Invalid remote drive item data');
  }
};

const createUserPermission = (
  id: string,
  role: PermissionRole,
  expirationTime: Date | undefined,
  isInherited: boolean,
  identity: Identity
): Permission => {
  return new UserPermission({
    id: id,
    role: role,
    expirationTime: expirationTime,
    isInherited: isInherited,
    userId: identity.id,
    displayName: identity.displayName,
    emailAddress: identity.email,
  });
};

const createGroupPermission = (
  id: string,
  role: PermissionRole,
  expirationTime: Date | undefined,
  isInherited: boolean,
  identity: Identity
): Permission => {
  return new GroupPermission({
    id: id,
    role: role,
    expirationTime: expirationTime,
    isInherited: isInherited,
    groupId: identity.id,
    displayName: identity.displayName,
    emailAddress: identity.email,
  });
};

const createDevicePermission = (
  id: string,
  role: PermissionRole,
  expirationTime: Date | undefined,
  isInherited: boolean,
  identity: Identity
): Permission => {
  return new DevicePermission({
    id: id,
    role: role,
    expirationTime: expirationTime,
    isInherited: isInherited,
    deviceId: identity.id,
    displayName: identity.displayName,
  });
};

const createApplicationPermission = (
  id: string,
  role: PermissionRole,
  expirationTime: Date | undefined,
  isInherited: boolean,
  identity: Identity
): Permission => {
  return new ApplicationPermission({
    id: id,
    role: role,
    expirationTime: expirationTime,
    isInherited: isInherited,
    applicationId: identity.id,
    displayName: identity.displayName,
  });
};

const mapRemoteRoleToRole = (
  roles: PermissionRoleRemote[] | undefined
): PermissionRole | undefined => {
  if (!roles) {
    return undefined;
  } else if (roles.includes('owner')) {
    return 'owner';
  } else if (roles.includes('write')) {
    return 'writer';
  } else if (roles.includes('read')) {
    return 'reader';
  } else {
    return undefined;
  }
};
