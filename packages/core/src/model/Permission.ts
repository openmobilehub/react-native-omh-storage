/**
 * Permissions granted to StorageEntity.
 */
export abstract class Permission {
  id: string;
  role: PermissionRole;
  isInherited?: boolean;

  constructor({
    id,
    role,
    isInherited,
  }: {
    id: string;
    role: PermissionRole;
    isInherited?: boolean;
  }) {
    this.id = id;
    this.role = role;
    this.isInherited = isInherited;
  }
}

/**
 * The role of the permission.
 */
export type PermissionRole = 'owner' | 'writer' | 'commenter' | 'reader';

export class UserPermission extends Permission {
  userId?: string;
  displayName?: string;
  emailAddress?: string;
  expirationTime?: Date;
  deleted?: boolean;
  photoLink?: string;
  pendingOwner?: boolean;

  constructor({
    id,
    role,
    isInherited,
    userId,
    displayName,
    emailAddress,
    expirationTime,
    deleted,
    photoLink,
    pendingOwner,
  }: {
    id: string;
    role: PermissionRole;
    isInherited?: boolean;
    userId?: string;
    displayName?: string;
    emailAddress?: string;
    expirationTime?: Date;
    deleted?: boolean;
    photoLink?: string;
    pendingOwner?: boolean;
  }) {
    super({ id, role, isInherited });
    this.userId = userId;
    this.displayName = displayName;
    this.emailAddress = emailAddress;
    this.expirationTime = expirationTime;
    this.deleted = deleted;
    this.photoLink = photoLink;
    this.pendingOwner = pendingOwner;
  }
}

export class GroupPermission extends Permission {
  groupId?: string;
  displayName?: string;
  emailAddress?: string;
  expirationTime?: Date;
  deleted?: boolean;

  constructor({
    id,
    role,
    isInherited,
    groupId,
    displayName,
    emailAddress,
    expirationTime,
    deleted,
  }: {
    id: string;
    role: PermissionRole;
    isInherited?: boolean;
    groupId?: string;
    displayName?: string;
    emailAddress?: string;
    expirationTime?: Date;
    deleted?: boolean;
  }) {
    super({ id, role, isInherited });
    this.groupId = groupId;
    this.displayName = displayName;
    this.emailAddress = emailAddress;
    this.expirationTime = expirationTime;
    this.deleted = deleted;
  }
}

export class DomainPermission extends Permission {
  displayName?: string;
  domain?: string;

  constructor({
    id,
    role,
    isInherited,
    displayName,
    domain,
  }: {
    id: string;
    role: PermissionRole;
    isInherited?: boolean;
    displayName?: string;
    domain?: string;
  }) {
    super({ id, role, isInherited });
    this.displayName = displayName;
    this.domain = domain;
  }
}

export class AnyonePermission extends Permission {}

export class DevicePermission extends Permission {
  deviceId?: string;
  displayName?: string;
  expirationTime?: Date;

  constructor({
    id,
    role,
    isInherited,
    deviceId,
    displayName,
    expirationTime,
  }: {
    id: string;
    role: PermissionRole;
    isInherited?: boolean;
    deviceId?: string;
    displayName?: string;
    expirationTime?: Date;
  }) {
    super({ id, role, isInherited });
    this.deviceId = deviceId;
    this.displayName = displayName;
    this.expirationTime = expirationTime;
  }
}

export class ApplicationPermission extends Permission {
  applicationId?: string;
  displayName?: string;
  expirationTime?: Date;

  constructor({
    id,
    role,
    isInherited,
    applicationId,
    displayName,
    expirationTime,
  }: {
    id: string;
    role: PermissionRole;
    isInherited?: boolean;
    applicationId?: string;
    displayName?: string;
    expirationTime?: Date;
  }) {
    super({ id, role, isInherited });
    this.applicationId = applicationId;
    this.displayName = displayName;
    this.expirationTime = expirationTime;
  }
}
