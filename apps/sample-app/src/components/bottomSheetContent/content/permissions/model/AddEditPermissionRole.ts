import { PermissionRole } from '@openmobilehub/storage-core';

import { Provider } from '@/constants/provider.ts';

export enum AddEditPermissionRole {
  WRITER = 'Writer',
  COMMENTER = 'Commenter',
  READER = 'Reader',
}

const DROPBOX_ROLE_OPTIONS = [
  AddEditPermissionRole.WRITER,
  AddEditPermissionRole.COMMENTER,
];

export const getRoleOptions = (provider: Provider | null) => {
  let roles = Object.entries(AddEditPermissionRole);
  switch (provider) {
    case Provider.DROPBOX:
      roles = roles.filter(([_key, label]) =>
        DROPBOX_ROLE_OPTIONS.includes(label)
      );
  }
  return roles.map(([key, label]) => ({
    key,
    label,
    value: label,
  }));
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
