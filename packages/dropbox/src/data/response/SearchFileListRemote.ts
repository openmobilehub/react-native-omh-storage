import type { Metadata } from './Metadata';

export interface SearchFileListRemote {
  matches: { metadata: { metadata: Metadata } }[];
}
