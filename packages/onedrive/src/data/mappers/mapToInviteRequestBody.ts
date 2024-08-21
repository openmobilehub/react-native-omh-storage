import {
  UnsupportedOperationException,
  type PermissionRecipient,
  type PermissionRole,
} from '@openmobilehub/storage-core';

import type {
  DriveRecipient,
  InviteRequestBody,
} from '../body/InviteRequestBody';
import type { PermissionRoleRemote } from '../response/PermissionRemote';

export const mapToInviteRequestBody = (
  role: PermissionRole,
  recipient: PermissionRecipient,
  sendNotificationEmail: boolean,
  emailMessage?: string
): InviteRequestBody => {
  const remoteRole = mapRoleToRemoteRole(role);
  const driveRecipient = mapPermissionRecipientToDriveRecipient(recipient);
  return {
    requireSignIn: true,
    sendInvitation: sendNotificationEmail,
    roles: [remoteRole],
    recipients: [driveRecipient],
    message: emailMessage,
  };
};

export const mapRoleToRemoteRole = (
  role: PermissionRole
): PermissionRoleRemote => {
  switch (role) {
    case 'owner':
      return 'owner';
    case 'writer':
      return 'write';
    case 'commenter':
      throw new UnsupportedOperationException();
    case 'reader':
      return 'read';
  }
};

const mapPermissionRecipientToDriveRecipient = (
  recipient: PermissionRecipient
): DriveRecipient => {
  switch (recipient.type) {
    case 'anyone':
      throw new UnsupportedOperationException();
    case 'user':
      return {
        email: recipient.email,
      };
    case 'group':
      return {
        email: recipient.email,
      };
    case 'domain':
      throw new UnsupportedOperationException();
    case 'objectId':
      return {
        email: recipient.objectId,
      };
    case 'alias':
      return {
        email: recipient.alias,
      };
  }
};
