import type { AccessLevel } from '../response/AccessLevel';
import type { MemberSelector } from './MemberSelector';

export interface UpdateFolderMemberBody {
  access_level: AccessLevel;
  shared_folder_id: string;
  member: MemberSelector;
}
