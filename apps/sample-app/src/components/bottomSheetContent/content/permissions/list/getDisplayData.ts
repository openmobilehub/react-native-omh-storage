import {
  AnyonePermission,
  ApplicationPermission,
  DevicePermission,
  DomainPermission,
  GroupPermission,
  Permission,
  UserPermission,
} from '@openmobilehub/storage-core';

import { DisplayEntry } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayRow.tsx';

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

const LABEL_TYPE = 'Type';
const LABEL_IDENTITY_ID = 'Identity ID';
const LABEL_DISPLAY_NAME = 'Display name';
const LABEL_EMAIL_ADDRESS = 'Email';
const LABEL_EXPIRATION_TIME = 'Expiration time';
const LABEL_DELETED = 'Deleted';
const LABEL_PENDING_OWNER = 'Pending owner';
const LABEL_USER_PHOTO = 'User photo';
const LABEL_DOMAIN = 'Domain';

const getPermissionTypeSpecificDisplayData = (
  permission: Permission | undefined
): DisplayEntry[] => {
  if (permission instanceof UserPermission) {
    const userIdentity = permission as UserPermission;
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
  } else if (permission instanceof GroupPermission) {
    const groupIdentity = permission as GroupPermission;
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
  } else if (permission instanceof DomainPermission) {
    const domainIdentity = permission as DomainPermission;
    return [
      new DisplayEntry(LABEL_TYPE, 'Domain'),
      new DisplayEntry(LABEL_DISPLAY_NAME, domainIdentity.displayName),
      new DisplayEntry(LABEL_DOMAIN, domainIdentity.domain),
    ];
  } else if (permission instanceof AnyonePermission) {
    return [new DisplayEntry(LABEL_TYPE, 'Anyone')];
  } else if (permission instanceof DevicePermission) {
    const deviceIdentity = permission as DevicePermission;
    return [
      new DisplayEntry(LABEL_TYPE, 'Device'),
      new DisplayEntry(LABEL_IDENTITY_ID, deviceIdentity.id),
      new DisplayEntry(LABEL_DISPLAY_NAME, deviceIdentity.displayName),
      new DisplayEntry(
        LABEL_EXPIRATION_TIME,
        deviceIdentity.expirationTime?.toString()
      ),
    ];
  } else if (permission instanceof ApplicationPermission) {
    const applicationIdentity = permission as ApplicationPermission;
    return [
      new DisplayEntry(LABEL_TYPE, 'Application'),
      new DisplayEntry(LABEL_IDENTITY_ID, applicationIdentity.id),
      new DisplayEntry(LABEL_DISPLAY_NAME, applicationIdentity.displayName),
      new DisplayEntry(
        LABEL_EXPIRATION_TIME,
        applicationIdentity.expirationTime?.toString()
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
