type WriteMode = 'add' | 'overwrite' | 'update';

export type CommitInfo = {
  path: string;
  mode: WriteMode;
  autorename: boolean;
  mute: boolean;
  strict_conflict: boolean;
};
