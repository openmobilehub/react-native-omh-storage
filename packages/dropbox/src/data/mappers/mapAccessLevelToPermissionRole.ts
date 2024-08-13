import { type PermissionRole } from '@openmobilehub/storage-core';

import type { AccessLevel } from '../response/AccessLevel';

export const mapAccessLevelToPermissionRole = (
  accessLevel: AccessLevel | undefined
): PermissionRole | undefined => {
  switch (accessLevel) {
    case 'owner':
      return 'owner';
    case 'editor':
      return 'writer';
    case 'viewer':
      return 'commenter';
    case 'viewer_no_comment':
      return 'reader';
    default:
      return undefined;
  }
};

export const mapPermissionRoleToAccessLevel = (
  role: PermissionRole
): AccessLevel => {
  switch (role) {
    case 'owner':
      return 'owner';
    case 'writer':
      return 'editor';
    case 'commenter':
      return 'viewer';
    case 'reader':
      return 'viewer_no_comment';
  }
};
