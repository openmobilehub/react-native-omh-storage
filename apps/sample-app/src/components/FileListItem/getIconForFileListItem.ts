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

enum MimeType {
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
}

export const getIconForFileListItem = (mimeType?: string) => {
  switch (mimeType) {
    case MimeType.PDF:
      return URL_PDF;
    case MimeType.GOOGLE_DOCUMENT:
    case MimeType.MICROSOFT_WORD:
    case MimeType.OPEN_DOCUMENT_TEXT:
      return URL_DOCUMENT;
    case MimeType.GOOGLE_SPREADSHEET:
    case MimeType.MICROSOFT_EXCEL:
    case MimeType.OPEN_DOCUMENT_SPREADSHEET:
      return URL_SHEET;
    case MimeType.GOOGLE_PRESENTATION:
    case MimeType.MICROSOFT_POWERPOINT:
    case MimeType.OPEN_DOCUMENT_PRESENTATION:
      return URL_PRESENTATION;
    case MimeType.PNG:
    case MimeType.JPEG:
      return URL_PNG;
    case MimeType.ZIP:
      return URL_ZIP;
    case MimeType.GOOGLE_VIDEO:
    case MimeType.MP4:
      return URL_VIDEO;
    default:
      return URL_OTHER;
  }
};
