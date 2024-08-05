type FileDetails = {
  label: string;
  extension?: string;
  mimeType: string;
};

export type FileType = 'Folder' | 'Document' | 'Spreadsheet' | 'Presentation';

export const fileTypes: Record<FileType, FileDetails> = {
  Folder: {
    label: 'Folder',
    mimeType: 'application/vnd.google-apps.folder',
  },
  Document: {
    label: 'Document',
    extension: 'docx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  Spreadsheet: {
    label: 'Spreadsheet',
    extension: 'xlsx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  Presentation: {
    label: 'Presentation',
    extension: 'pptx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
};
