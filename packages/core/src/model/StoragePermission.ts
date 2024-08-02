/**
 * Permissions granted to StorageEntity.
 */
export class StoragePermission {
  id: string;
  role: PermissionRole;
  identity: Identity;
  isInherited?: boolean;

  constructor({
    id,
    role,
    identity,
    isInherited,
  }: {
    id: string;
    role: PermissionRole;
    identity: Identity;
    isInherited?: boolean;
  }) {
    this.id = id;
    this.role = role;
    this.identity = identity;
    this.isInherited = isInherited;
  }
}

/**
 * The role of the permission.
 */
export type PermissionRole = 'owner' | 'writer' | 'commenter' | 'reader';

/**
 * An identity for witch a permission is granted
 */
export type Identity =
  | UserIdentity
  | GroupIdentity
  | DomainIdentity
  | AnyoneIdentity
  | DeviceIdentity
  | ApplicationIdentity;

export class UserIdentity {
  id?: string;
  displayName?: string;
  emailAddress?: string;
  expirationTime?: Date;
  deleted?: boolean;
  photoLink?: string;
  pendingOwner?: boolean;

  constructor({
    id,
    displayName,
    emailAddress,
    expirationTime,
    deleted,
    photoLink,
    pendingOwner,
  }: {
    id?: string;
    displayName?: string;
    emailAddress?: string;
    expirationTime?: Date;
    deleted?: boolean;
    photoLink?: string;
    pendingOwner?: boolean;
  }) {
    this.id = id;
    this.displayName = displayName;
    this.emailAddress = emailAddress;
    this.expirationTime = expirationTime;
    this.deleted = deleted;
    this.photoLink = photoLink;
    this.pendingOwner = pendingOwner;
  }
}

export class GroupIdentity {
  id?: string;
  displayName?: string;
  emailAddress?: string;
  expirationTime?: Date;
  deleted?: boolean;

  constructor({
    id,
    displayName,
    emailAddress,
    expirationTime,
    deleted,
  }: {
    id?: string;
    displayName?: string;
    emailAddress?: string;
    expirationTime?: Date;
    deleted?: boolean;
  }) {
    this.id = id;
    this.displayName = displayName;
    this.emailAddress = emailAddress;
    this.expirationTime = expirationTime;
    this.deleted = deleted;
  }
}

export class DomainIdentity {
  displayName?: string;
  domain?: string;

  constructor({
    displayName,
    domain,
  }: {
    displayName?: string;
    domain?: string;
  }) {
    this.displayName = displayName;
    this.domain = domain;
  }
}

export class AnyoneIdentity {}

export class DeviceIdentity {
  id?: string;
  displayName?: string;
  expirationTime?: Date;

  constructor({
    id,
    displayName,
    expirationTime,
  }: {
    id?: string;
    displayName?: string;
    expirationTime?: Date;
  }) {
    this.id = id;
    this.displayName = displayName;
    this.expirationTime = expirationTime;
  }
}

export class ApplicationIdentity {
  id?: string;
  displayName?: string;
  expirationTime?: Date;

  constructor({
    id,
    displayName,
    expirationTime,
  }: {
    id?: string;
    displayName?: string;
    expirationTime?: Date;
  }) {
    this.id = id;
    this.displayName = displayName;
    this.expirationTime = expirationTime;
  }
}
