import type { MemberSelector } from './MemberSelector';

export interface RemoveFolderMemberBody {
  leave_a_copy: boolean;
  member: MemberSelector;
  shared_folder_id: string;
}
