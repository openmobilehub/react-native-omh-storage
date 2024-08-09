export type CheckShareJobStatusResponse =
  | {
      ['.tag']: 'complete';
      shared_folder_idString: string;
    }
  | {
      ['.tag']: 'in_progress';
    };
