import { PermissionRole } from '@openmobilehub/storage-core';

import { Provider } from '@/constants/provider.ts';

export enum AddEditPermissionRole {
  WRITER = 'Writer',
  COMMENTER = 'Commenter',
  READER = 'Reader',
}

const DROPBOX_DISABLED_ROLES = [AddEditPermissionRole.READER];
const ONEDRIVE_DISABLED_ROLES = [AddEditPermissionRole.COMMENTER];

export const getRoleOptions = (provider: Provider | null) => {
  let roles = Object.entries(AddEditPermissionRole);
  const disabledRole = getDisabledRole(provider);

  return roles
    .filter(([_key, label]) => !disabledRole.includes(label))
    .map(([key, label]) => ({
      key,
      label,
      value: label,
    }));
};

const getDisabledRole = (provider: Provider | null) => {
  switch (provider) {
    case Provider.DROPBOX:
      return DROPBOX_DISABLED_ROLES;
    case Provider.ONEDRIVE:
      return ONEDRIVE_DISABLED_ROLES;
    default:
      return [];
  }
};

export const getDefaultRole = (provider: Provider | null) => {
  switch (provider) {
    case Provider.DROPBOX:
      return AddEditPermissionRole.COMMENTER;
    default:
      return AddEditPermissionRole.READER;
  }
};

export const mapAddEditPermissionRoleToCore = (
  role: AddEditPermissionRole
): PermissionRole => {
  switch (role) {
    case AddEditPermissionRole.WRITER:
      return 'writer';
    case AddEditPermissionRole.READER:
      return 'reader';
    case AddEditPermissionRole.COMMENTER:
      return 'commenter';
  }
};

export const mapCoreToAddEditPermissionRole = (
  role: PermissionRole
): AddEditPermissionRole | undefined => {
  switch (role) {
    case 'owner':
      return undefined;
    case 'writer':
      return AddEditPermissionRole.WRITER;
    case 'commenter':
      return AddEditPermissionRole.COMMENTER;
    case 'reader':
      return AddEditPermissionRole.READER;
  }
};
