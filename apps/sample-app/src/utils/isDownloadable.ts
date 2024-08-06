import { FileType } from '@/types/FileTypes';

const NON_SUPPORTED_MIME_TYPES_FOR_DOWNLOAD = [
  FileType.GOOGLE_THIRD_PARTY_SHORTCUT,
  FileType.GOOGLE_FILE,
  FileType.GOOGLE_FUSIONTABLE,
  FileType.GOOGLE_JAMBOARD,
  FileType.GOOGLE_MAP,
  FileType.GOOGLE_SITE,
  FileType.GOOGLE_UNKNOWN,
];

export const isDownloadable = (file: { mimeType: string }): boolean => {
  return !NON_SUPPORTED_MIME_TYPES_FOR_DOWNLOAD.includes(
    file.mimeType as FileType
  );
};
