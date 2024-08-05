import type { PermissionRole } from '@openmobilehub/storage-core';

export abstract class CreatePermission {
  role: PermissionRole;
  constructor({ role }: { role: PermissionRole }) {
    this.role = role;
  }
}

export class CreateUserPermission extends CreatePermission {
  emailAddress: string;

  constructor({
    role,
    emailAddress,
  }: {
    role: PermissionRole;
    emailAddress: string;
  }) {
    super({ role });
    this.emailAddress = emailAddress;
  }
}

export class CreateGroupPermission extends CreatePermission {
  emailAddress: string;

  constructor({
    role,
    emailAddress,
  }: {
    role: PermissionRole;
    emailAddress: string;
  }) {
    super({ role });
    this.emailAddress = emailAddress;
  }
}

export class CreateDomainPermission extends CreatePermission {
  domain: string;

  constructor({ role, domain }: { role: PermissionRole; domain: string }) {
    super({ role });
    this.domain = domain;
  }
}

export class CreateAnyonePermission extends CreatePermission {}

export class CreatePermissionForObjectId extends CreatePermission {
  objectId: string;

  constructor({ objectId, role }: { objectId: string; role: PermissionRole }) {
    super({ role });
    this.objectId = objectId;
  }
}

export class CreatePermissionForAlias extends CreatePermission {
  alias: string;

  constructor({ alias, role }: { alias: string; role: PermissionRole }) {
    super({ role });
    this.alias = alias;
  }
}
