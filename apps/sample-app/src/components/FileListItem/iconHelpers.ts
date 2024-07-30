// Define URLs for icons
export const URL_FOLDER =
  'https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.folder';
const URL_DOCUMENT =
  'https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.document';
const URL_SHEET =
  'https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.spreadsheet';
export const URL_PRESENTATION =
  'https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.presentation';
const URL_PDF =
  'https://drive-thirdparty.googleusercontent.com/32/type/application/pdf';
const URL_PNG =
  'https://drive-thirdparty.googleusercontent.com/32/type/image/png';
const URL_ZIP =
  'https://drive-thirdparty.googleusercontent.com/32/type/application/zip';
const URL_VIDEO =
  'https://drive-thirdparty.googleusercontent.com/32/type/video/mp4';
const URL_OTHER = 'https://static.thenounproject.com/png/3482632-200.png';

enum FileType {
  GOOGLE_DOCUMENT = 'application/vnd.google-apps.document',
  GOOGLE_SPREADSHEET = 'application/vnd.google-apps.spreadsheet',
  GOOGLE_PRESENTATION = 'application/vnd.google-apps.presentation',
  GOOGLE_VIDEO = 'application/vnd.google-apps.video',
  PDF = 'application/pdf',
  MICROSOFT_WORD = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  OPEN_DOCUMENT_TEXT = 'application/vnd.oasis.opendocument.text',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  ZIP = 'application/zip',
  MICROSOFT_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  OPEN_DOCUMENT_SPREADSHEET = 'application/x-vnd.oasis.opendocument.spreadsheet',
  MICROSOFT_POWERPOINT = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  OPEN_DOCUMENT_PRESENTATION = 'application/vnd.oasis.opendocument.presentation',
  MP4 = 'video/mp4',
  OTHER = '',
}

// Function to get icon URL based on MIME type
export const getIconForMimeType = (mimeType?: string) => {
  switch (mimeType) {
    case FileType.PDF:
      return URL_PDF;
    case FileType.GOOGLE_DOCUMENT:
    case FileType.MICROSOFT_WORD:
    case FileType.OPEN_DOCUMENT_TEXT:
      return URL_DOCUMENT;
    case FileType.GOOGLE_SPREADSHEET:
    case FileType.MICROSOFT_EXCEL:
    case FileType.OPEN_DOCUMENT_SPREADSHEET:
      return URL_SHEET;
    case FileType.GOOGLE_PRESENTATION:
    case FileType.MICROSOFT_POWERPOINT:
    case FileType.OPEN_DOCUMENT_PRESENTATION:
      return URL_PRESENTATION;
    case FileType.PNG:
    case FileType.JPEG:
      return URL_PNG;
    case FileType.ZIP:
      return URL_ZIP;
    case FileType.GOOGLE_VIDEO:
    case FileType.MP4:
      return URL_VIDEO;
    default:
      return URL_OTHER;
  }
};
