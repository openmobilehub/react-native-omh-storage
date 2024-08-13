import type { AccessLevel } from '../response/AccessLevel';
import type { MemberSelector } from './MemberSelector';

export interface AddFolderMemberBody {
  custom_message?: string;
  shared_folder_id: string;
  members: Array<{
    access_level: AccessLevel;
    member: MemberSelector;
  }>;
  quiet: boolean;
}
