export interface PermissionRemote {
  id?: string;
  type?: PermissionTypeRemote;
  emailAddress?: string;
  domain?: string;
  role?: PermissionRoleRemote;
  displayName?: string;
  photoLink?: string;
  deleted?: boolean;
  pendingOwner?: boolean;
  expirationTime?: string;
  permissionDetails?: PermissionDetailsRemote[];
}

export interface PermissionDetailsRemote {
  inherited?: boolean;
}

export type PermissionRoleRemote = 'owner' | 'writer' | 'commenter' | 'reader';
export type PermissionTypeRemote = 'user' | 'group' | 'domain' | 'anyone';
