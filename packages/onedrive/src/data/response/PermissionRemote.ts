export interface PermissionRemote {
  // Even though grantedTo is deprecated, it is sometimes returned instead of grantedToV2
  grantedTo?: {
    user?: Identity;
    device?: Identity;
    application?: Identity;
  };
  grantedToV2?: {
    user?: Identity;
    group?: Identity;
    device?: Identity;
    application?: Identity;
  };
  id?: string;
  roles?: PermissionRoleRemote[];
  expirationDateTime?: string;
  inheritedFrom?: {
    id?: string;
  };
}

export interface Identity {
  id?: string;
  displayName?: string;
  email?: string;
}

export type PermissionRoleRemote = 'owner' | 'write' | 'read';
