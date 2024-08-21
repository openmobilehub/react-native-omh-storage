import type { PermissionRoleRemote } from '../response/PermissionRemote';

export interface InviteRequestBody {
  requireSignIn: boolean;
  sendInvitation: boolean;
  roles: PermissionRoleRemote[];
  recipients: DriveRecipient[];
  message?: string;
}

export interface DriveRecipient {
  alias?: string;
  email?: string;
  objectId?: string;
}
