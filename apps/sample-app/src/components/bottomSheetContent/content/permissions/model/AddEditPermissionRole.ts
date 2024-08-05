import { PermissionRole } from '@openmobilehub/storage-core';

export enum AddEditPermissionRole {
  WRITER = 'Writer',
  READER = 'Reader',
  COMMENTER = 'Commenter',
}

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
