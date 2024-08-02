export interface PermissionRemote {
  id?: string;
  type?: string;
  emailAddress?: string;
  domain?: string;
  role?: string;
  displayName?: string;
  photoLink?: string;
  deleted?: boolean;
  pendingOwner?: boolean;
  expirationTime?: string;
  permissionDetails?: PermissionDetailsRemote[];
}

export interface PermissionDetailsRemote {
  permissionType?: string;
  inheritedFrom?: string;
  role?: string;
  inherited?: boolean;
}
