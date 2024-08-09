import type { MemberSelector } from './MemberSelector';

export interface RemoveFileMemberBody {
  file: string;
  member: MemberSelector;
}
