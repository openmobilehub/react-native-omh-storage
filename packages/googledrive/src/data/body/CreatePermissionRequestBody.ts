import type {
  PermissionRoleRemote,
  PermissionTypeRemote,
} from '../response/PermissionRemote';

export interface CreatePermissionRequestBody {
  type: PermissionTypeRemote;
  role: PermissionRoleRemote;
  emailAddress?: string;
  domain?: string;
}
