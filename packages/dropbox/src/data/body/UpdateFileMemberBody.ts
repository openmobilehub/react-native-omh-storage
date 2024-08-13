import type { AccessLevel } from '../response/AccessLevel';
import type { MemberSelector } from './MemberSelector';

export interface UpdateFileMemberBody {
  access_level: AccessLevel;
  file: string;
  member: MemberSelector;
}
