import {
  AnyonePermission,
  ApplicationPermission,
  DevicePermission,
  DomainPermission,
  GroupPermission,
  Permission,
  UserPermission,
} from '@openmobilehub/storage-core';

import { DisplayEntry } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayEntry.types';

export class DisplayPermission {
  constructor(
    public readonly id: string,
    public readonly entries: DisplayEntry[],
    public readonly userPhotoUri: string | undefined
  ) {}
}

export const getDisplayData = (permission: Permission): DisplayPermission => {
  return {
    id: permission.id,
    entries: getPermissionDisplayData(permission),
    userPhotoUri: getUserPhotoUri(permission),
  };
};
const LABELS = {
  TYPE: 'Type',
  IDENTITY_ID: 'Identity ID',
  DISPLAY_NAME: 'Display name',
  EMAIL_ADDRESS: 'Email',
  EXPIRATION_TIME: 'Expiration time',
  DELETED: 'Deleted',
  PENDING_OWNER: 'Pending owner',
  USER_PHOTO: 'User photo',
  DOMAIN: 'Domain',
};

const getPermissionTypeSpecificDisplayData = (
  permission: Permission | undefined
): DisplayEntry[] => {
  if (permission instanceof UserPermission) {
    return [
      new DisplayEntry(LABELS.TYPE, 'User'),
      new DisplayEntry(LABELS.IDENTITY_ID, permission.id),
      new DisplayEntry(LABELS.DISPLAY_NAME, permission.displayName),
      new DisplayEntry(LABELS.EMAIL_ADDRESS, permission.emailAddress),
      new DisplayEntry(
        LABELS.EXPIRATION_TIME,
        permission.expirationTime?.toString()
      ),
      new DisplayEntry(LABELS.DELETED, permission.deleted?.toString()),
      new DisplayEntry(
        LABELS.PENDING_OWNER,
        permission.pendingOwner?.toString()
      ),
      new DisplayEntry(LABELS.USER_PHOTO, permission.photoLink),
    ];
  } else if (permission instanceof GroupPermission) {
    return [
      new DisplayEntry(LABELS.TYPE, 'Group'),
      new DisplayEntry(LABELS.IDENTITY_ID, permission.id),
      new DisplayEntry(LABELS.DISPLAY_NAME, permission.displayName),
      new DisplayEntry(LABELS.EMAIL_ADDRESS, permission.emailAddress),
      new DisplayEntry(
        LABELS.EXPIRATION_TIME,
        permission.expirationTime?.toString()
      ),
      new DisplayEntry(LABELS.DELETED, permission.deleted?.toString()),
    ];
  } else if (permission instanceof DomainPermission) {
    return [
      new DisplayEntry(LABELS.TYPE, 'Domain'),
      new DisplayEntry(LABELS.DISPLAY_NAME, permission.displayName),
      new DisplayEntry(LABELS.DOMAIN, permission.domain),
    ];
  } else if (permission instanceof AnyonePermission) {
    return [new DisplayEntry(LABELS.TYPE, 'Anyone')];
  } else if (permission instanceof DevicePermission) {
    return [
      new DisplayEntry(LABELS.TYPE, 'Device'),
      new DisplayEntry(LABELS.IDENTITY_ID, permission.id),
      new DisplayEntry(LABELS.DISPLAY_NAME, permission.displayName),
      new DisplayEntry(
        LABELS.EXPIRATION_TIME,
        permission.expirationTime?.toString()
      ),
    ];
  } else if (permission instanceof ApplicationPermission) {
    return [
      new DisplayEntry(LABELS.TYPE, 'Application'),
      new DisplayEntry(LABELS.IDENTITY_ID, permission.id),
      new DisplayEntry(LABELS.DISPLAY_NAME, permission.displayName),
      new DisplayEntry(
        LABELS.EXPIRATION_TIME,
        permission.expirationTime?.toString()
      ),
    ];
  } else {
    throw Error('Invalid permission type');
  }
};

const getPermissionDisplayData = (permission: Permission): DisplayEntry[] => {
  const commonDisplayEntries = [
    new DisplayEntry('ID', permission.id),
    new DisplayEntry('Role', permission.role),
    new DisplayEntry('Inherited', permission.isInherited?.toString()),
  ];

  const additionalDisplayEntries =
    getPermissionTypeSpecificDisplayData(permission);

  return [...commonDisplayEntries, ...additionalDisplayEntries];
};

const getUserPhotoUri = (permission: Permission): string | undefined => {
  if (permission instanceof UserPermission) {
    return permission.photoLink;
  }
  return undefined;
};
