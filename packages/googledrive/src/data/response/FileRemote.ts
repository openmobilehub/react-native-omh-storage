export interface FileRemote {
  id?: string;
  name?: string;
  createdTime?: string;
  modifiedTime?: string;
  parents?: string[];
  mimeType?: string;
  fileExtension?: string;
  size?: number;
}
