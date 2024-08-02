import {
  AnyoneIdentity,
  ApplicationIdentity,
  DeviceIdentity,
  DomainIdentity,
  GroupIdentity,
  Identity,
  StoragePermission,
  UserIdentity,
} from '@openmobilehub/storage-core';

import { DisplayEntry } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayRow.tsx';

export class DisplayPermission {
  constructor(
    public readonly id: string,
    public readonly entries: DisplayEntry[]
  ) {}
}

export const getDisplayData = (
  permission: StoragePermission[]
): DisplayPermission[] => {
  return permission.map((item) => ({
    id: item.id,
    entries: getPermissionDisplayData(item),
  }));
};

const LABEL_TYPE = 'Type';
const LABEL_IDENTITY_ID = 'Identity ID';
const LABEL_DISPLAY_NAME = 'Display name';
const LABEL_EMAIL_ADDRESS = 'Email';
const LABEL_EXPIRATION_TIME = 'Expiration time';
const LABEL_DELETED = 'Deleted';
const LABEL_PENDING_OWNER = 'Pending owner';
const LABEL_USER_PHOTO = 'User photo';
const LABEL_DOMAIN = 'Domain';

const getIdentityDisplayData = (
  identity: Identity | undefined
): DisplayEntry[] => {
  // TODO dn: fixme
  switch (identity) {
    case UserIdentity:
      const userIdentity = identity as UserIdentity;
      return [
        new DisplayEntry(LABEL_TYPE, 'User'),
        new DisplayEntry(LABEL_IDENTITY_ID, userIdentity.id),
        new DisplayEntry(LABEL_DISPLAY_NAME, userIdentity.displayName),
        new DisplayEntry(LABEL_EMAIL_ADDRESS, userIdentity.emailAddress),
        new DisplayEntry(
          LABEL_EXPIRATION_TIME,
          userIdentity.expirationTime?.toString()
        ),
        new DisplayEntry(LABEL_DELETED, userIdentity.deleted?.toString()),
        new DisplayEntry(
          LABEL_PENDING_OWNER,
          userIdentity.pendingOwner?.toString()
        ),
        new DisplayEntry(LABEL_USER_PHOTO, userIdentity.photoLink),
      ];
    case GroupIdentity:
      const groupIdentity = identity as GroupIdentity;
      return [
        new DisplayEntry(LABEL_TYPE, 'Group'),
        new DisplayEntry(LABEL_IDENTITY_ID, groupIdentity.id),
        new DisplayEntry(LABEL_DISPLAY_NAME, groupIdentity.displayName),
        new DisplayEntry(LABEL_EMAIL_ADDRESS, groupIdentity.emailAddress),
        new DisplayEntry(
          LABEL_EXPIRATION_TIME,
          groupIdentity.expirationTime?.toString()
        ),
        new DisplayEntry(LABEL_DELETED, groupIdentity.deleted?.toString()),
      ];
    case DomainIdentity:
      const domainIdentity = identity as DomainIdentity;
      return [
        new DisplayEntry(LABEL_TYPE, 'Domain'),
        new DisplayEntry(LABEL_DISPLAY_NAME, domainIdentity.displayName),
        new DisplayEntry(LABEL_DOMAIN, domainIdentity.domain),
      ];
    case AnyoneIdentity:
      return [new DisplayEntry(LABEL_TYPE, 'Anyone')];
    case DeviceIdentity:
      const deviceIdentity = identity as DeviceIdentity;
      return [
        new DisplayEntry(LABEL_TYPE, 'Device'),
        new DisplayEntry(LABEL_IDENTITY_ID, deviceIdentity.id),
        new DisplayEntry(LABEL_DISPLAY_NAME, deviceIdentity.displayName),
        new DisplayEntry(
          LABEL_EXPIRATION_TIME,
          deviceIdentity.expirationTime?.toString()
        ),
      ];
    case ApplicationIdentity:
      const applicationIdentity = identity as ApplicationIdentity;
      return [
        new DisplayEntry(LABEL_TYPE, 'Application'),
        new DisplayEntry(LABEL_IDENTITY_ID, applicationIdentity.id),
        new DisplayEntry(LABEL_DISPLAY_NAME, applicationIdentity.displayName),
        new DisplayEntry(
          LABEL_EXPIRATION_TIME,
          applicationIdentity.expirationTime?.toString()
        ),
      ];
    default:
      return [];
  }
};

export const getPermissionDisplayData = (
  permission: StoragePermission
): DisplayEntry[] => {
  const permissionDisplayEntries = [
    new DisplayEntry('ID', permission.id),
    new DisplayEntry('Role', permission.role),
    new DisplayEntry('Inherited', permission.isInherited?.toString()),
  ];

  const identityDisplayEntries = getIdentityDisplayData(permission);

  return [...permissionDisplayEntries, ...identityDisplayEntries];
};
