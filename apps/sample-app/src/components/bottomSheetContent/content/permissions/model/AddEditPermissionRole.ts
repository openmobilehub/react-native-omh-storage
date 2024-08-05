import { PermissionRole } from '@openmobilehub/storage-core';

export enum AddEditPermissionRole {
  WRITER = 'Writer',
  COMMENTER = 'Commenter',
  READER = 'Reader',
}

export const roleOptions = Object.entries(AddEditPermissionRole).map(
  ([key, label]) => ({
    key,
    label,
    value: label,
  })
);

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
