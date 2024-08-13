export type ShareFolderResponse =
  | {
      ['.tag']: 'complete';
      shared_folder_id: string;
    }
  | {
      ['.tag']: 'async_job_id';
      async_job_id: string;
    };
