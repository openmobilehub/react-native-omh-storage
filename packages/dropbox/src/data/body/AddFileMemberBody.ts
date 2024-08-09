import type { AccessLevel } from '../response/AccessLevel';
import type { MemberSelector } from './MemberSelector';

export interface AddFileMemberBody {
  access_level: AccessLevel;
  custom_message?: string;
  file: string;
  members: Array<MemberSelector>;
  quiet: boolean;
}
