import { Provider } from '@/constants/provider.ts';

type FileDetails = {
  label: string;
  extension?: string;
  mimeType?: string;
};

export type FileType = 'Folder' | 'Document' | 'Spreadsheet' | 'Presentation';

export const getFileTypes = (provider: Provider | null) => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      return googleFileTypes;
    default:
      return commonFileTypes;
  }
};

const googleFileTypes: Record<FileType, FileDetails> = {
  Folder: {
    label: 'Folder',
    mimeType: 'application/vnd.google-apps.folder',
  },
  Document: {
    label: 'Document',
    mimeType: 'application/vnd.google-apps.document',
  },
  Spreadsheet: {
    label: 'Sheet',
    mimeType: 'application/vnd.google-apps.spreadsheet',
  },
  Presentation: {
    label: 'Presentation',
    mimeType: 'application/vnd.google-apps.presentation',
  },
};

const commonFileTypes: Record<FileType, FileDetails> = {
  Folder: {
    label: 'Folder',
  },
  Document: {
    label: 'Document',
    extension: 'docx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  Spreadsheet: {
    label: 'Sheet',
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
