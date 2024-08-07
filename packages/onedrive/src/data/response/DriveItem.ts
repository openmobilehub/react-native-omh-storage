export interface DriveItem {
  id?: string;
  name?: string;
  folder?: Folder;
  lastModifiedDateTime?: string;
  parentReference?: ParentReference;
  size?: number;
}

export interface Folder {
  childCount?: number;
}

export interface ParentReference {
  id?: string;
}
