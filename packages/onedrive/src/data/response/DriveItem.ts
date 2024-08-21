export interface DriveItem {
  id?: string;
  name?: string;
  createdDateTime?: string;
  lastModifiedDateTime?: string;
  parentReference?: ParentReference;
  size?: number;
  file?: File;
  folder?: Folder;
  webUrl?: string;
}

export interface File {
  mimeType?: string;
}

export interface Folder {
  id?: string;
}

export interface ParentReference {
  id?: string;
}
