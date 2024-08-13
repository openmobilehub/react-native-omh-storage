import {
  UnsupportedOperationException,
  type PermissionRecipient,
} from '@openmobilehub/storage-core';

import type { MemberSelector } from '../body/MemberSelector';

export const mapPermissionRecipientToMemberSelector = (
  permissionRecipient: PermissionRecipient
): MemberSelector => {
  switch (permissionRecipient.type) {
    case 'anyone':
      throw new UnsupportedOperationException();
    case 'user':
      return {
        '.tag': 'email',
        'email': permissionRecipient.email,
      };
    case 'group':
      throw new UnsupportedOperationException();
    case 'domain':
      throw new UnsupportedOperationException();
    case 'objectId':
      return {
        '.tag': 'dropbox_id',
        'dropbox_id': permissionRecipient.objectId,
      };
    case 'alias':
      throw new UnsupportedOperationException();
  }
};
