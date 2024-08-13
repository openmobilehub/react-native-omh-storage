import type { MemberSelector } from '../body/MemberSelector';
import { API_EMAIL_REGEX } from '../constants/constants';

export const mapPermissionIdToMemberSelector = (
  permissionId: string
): MemberSelector => {
  const emailRegex = new RegExp(API_EMAIL_REGEX);
  if (emailRegex.test(permissionId)) {
    return {
      '.tag': 'email',
      'email': permissionId,
    };
  } else {
    return {
      '.tag': 'dropbox_id',
      'dropbox_id': permissionId,
    };
  }
};
