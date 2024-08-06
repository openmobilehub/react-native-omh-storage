import { FileExtension, FileType, NormalizedFileType } from '@/types/FileTypes';

export const normalizeFileType = (fileType: FileType): NormalizedFileType => {
  switch (fileType) {
    case FileType.GOOGLE_DOCUMENT:
      return {
        mimeType: FileType.OPEN_DOCUMENT_TEXT,
        fileExtension: FileExtension.ODT,
      };
    case FileType.GOOGLE_DRAWING:
      return { mimeType: FileType.PNG, fileExtension: FileExtension.PNG };
    case FileType.GOOGLE_FORM:
      return { mimeType: FileType.PDF, fileExtension: FileExtension.PDF };
    case FileType.GOOGLE_PHOTO:
      return { mimeType: FileType.JPEG, fileExtension: FileExtension.JPG };
    case FileType.GOOGLE_PRESENTATION:
      return {
        mimeType: FileType.MICROSOFT_POWERPOINT,
        fileExtension: FileExtension.PPTX,
      };
    case FileType.GOOGLE_SCRIPT:
      return { mimeType: FileType.JSON, fileExtension: FileExtension.JSON };
    case FileType.GOOGLE_SHORTCUT:
      return {
        mimeType: FileType.GOOGLE_SHORTCUT,
        fileExtension: FileExtension.JSON,
      };
    case FileType.GOOGLE_SPREADSHEET:
      return {
        mimeType: FileType.MICROSOFT_EXCEL,
        fileExtension: FileExtension.XLSX,
      };
    case FileType.GOOGLE_VIDEO:
    case FileType.GOOGLE_AUDIO:
      return { mimeType: FileType.MP4, fileExtension: FileExtension.MP4 };
    case FileType.GOOGLE_THIRD_PARTY_SHORTCUT:
    case FileType.GOOGLE_FILE:
    case FileType.GOOGLE_FOLDER:
    case FileType.GOOGLE_FUSIONTABLE:
    case FileType.GOOGLE_JAMBOARD:
    case FileType.GOOGLE_MAP:
    case FileType.GOOGLE_SITE:
      return {
        mimeType: FileType.GOOGLE_UNKNOWN,
        fileExtension: FileExtension.OTHER,
      };
    case FileType.MICROSOFT_WORD:
      return {
        mimeType: FileType.MICROSOFT_WORD,
        fileExtension: FileExtension.DOCX,
      };
    case FileType.OPEN_DOCUMENT_TEXT:
      return {
        mimeType: FileType.OPEN_DOCUMENT_TEXT,
        fileExtension: FileExtension.ODT,
      };
    case FileType.RICH_TEXT:
      return { mimeType: FileType.RICH_TEXT, fileExtension: FileExtension.RTF };
    case FileType.PDF:
      return { mimeType: FileType.PDF, fileExtension: FileExtension.PDF };
    case FileType.TEXT:
      return { mimeType: FileType.TEXT, fileExtension: FileExtension.TXT };
    case FileType.ZIP:
      return { mimeType: FileType.ZIP, fileExtension: FileExtension.ZIP };
    case FileType.EPUB:
      return { mimeType: FileType.EPUB, fileExtension: FileExtension.EPUB };
    case FileType.MICROSOFT_EXCEL:
      return {
        mimeType: FileType.MICROSOFT_EXCEL,
        fileExtension: FileExtension.XLSX,
      };
    case FileType.OPEN_DOCUMENT_SPREADSHEET:
      return {
        mimeType: FileType.OPEN_DOCUMENT_SPREADSHEET,
        fileExtension: FileExtension.ODS,
      };
    case FileType.CSV:
      return { mimeType: FileType.CSV, fileExtension: FileExtension.CSV };
    case FileType.TSV:
      return { mimeType: FileType.TSV, fileExtension: FileExtension.TSV };
    case FileType.MICROSOFT_POWERPOINT:
      return {
        mimeType: FileType.MICROSOFT_POWERPOINT,
        fileExtension: FileExtension.PPTX,
      };
    case FileType.OPEN_DOCUMENT_PRESENTATION:
      return {
        mimeType: FileType.OPEN_DOCUMENT_PRESENTATION,
        fileExtension: FileExtension.ODP,
      };
    case FileType.JPEG:
      return { mimeType: FileType.JPEG, fileExtension: FileExtension.JPG };
    case FileType.PNG:
      return { mimeType: FileType.PNG, fileExtension: FileExtension.PNG };
    case FileType.SVG:
      return { mimeType: FileType.SVG, fileExtension: FileExtension.SVG };
    case FileType.JSON:
      return { mimeType: FileType.JSON, fileExtension: FileExtension.JSON };
    case FileType.MP4:
      return { mimeType: FileType.MP4, fileExtension: FileExtension.MP4 };
    default:
      return {
        mimeType: FileType.GOOGLE_UNKNOWN,
        fileExtension: FileExtension.OTHER,
      };
  }
};
