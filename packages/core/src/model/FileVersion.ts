export class FileVersion {
  fileId: string;
  versionId: string;
  lastModified: Date;

  constructor({
    fileId,
    versionId,
    lastModified,
  }: {
    fileId: string;
    versionId: string;
    lastModified: Date;
  }) {
    this.fileId = fileId;
    this.versionId = versionId;
    this.lastModified = lastModified;
  }
}
