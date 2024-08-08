import {
  UnsupportedOperationException,
  type PermissionRecipient,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type { CreatePermissionRequestBody } from '../body/CreatePermissionRequestBody';
import type { PermissionRoleRemote } from '../response/PermissionRemote';

export const mapPermissionRecipientToRequestBody = (
  recipient: PermissionRecipient,
  role: PermissionRole
): CreatePermissionRequestBody => {
  const remoteRole = mapPermissionRoleToRoleRemote(role);

  switch (recipient.type) {
    case 'user':
      return {
        type: 'user',
        role: remoteRole,
        emailAddress: recipient.email,
      };
    case 'group':
      return {
        type: 'group',
        role: remoteRole,
        emailAddress: recipient.email,
      };
    case 'domain':
      return {
        type: 'domain',
        role: remoteRole,
        domain: recipient.domain,
      };
    case 'anyone':
      return {
        type: 'anyone',
        role: remoteRole,
      };
    default:
      throw new UnsupportedOperationException();
  }
};

export const mapPermissionRoleToRoleRemote = (
  remoteRole: PermissionRole
): PermissionRoleRemote => {
  switch (remoteRole) {
    case 'owner':
      return 'owner';
    case 'writer':
      return 'writer';
    case 'commenter':
      return 'commenter';
    case 'reader':
      return 'reader';
  }
};
