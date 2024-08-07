export interface Metadata {
  ['.tag']?: 'file' | 'folder';
  name?: string;
  path_lower?: string;
  path_display?: string;
  id?: string;
  sharing_info?: {
    parent_shared_folder_id: string;
  };
}

export interface FolderMetadata extends Metadata {
  ['.tag']?: 'folder';
}

export interface FileMetadata extends Metadata {
  ['.tag']?: 'file';
  name?: string;
  path_lower?: string;
  path_display?: string;
  id?: string;
  client_modified?: string;
  server_modified?: string;
  rev?: number;
  size?: number;
  is_downloadable?: boolean;
  content_hash?: string;
}
