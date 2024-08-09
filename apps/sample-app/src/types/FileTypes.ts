export enum FileType {
  // Specific MIME from Google Workspace and Drive
  GOOGLE_AUDIO = 'application/vnd.google-apps.audio',
  GOOGLE_DOCUMENT = 'application/vnd.google-apps.document',
  GOOGLE_THIRD_PARTY_SHORTCUT = 'application/vnd.google-apps.drive-sdk',
  GOOGLE_DRAWING = 'application/vnd.google-apps.drawing',
  GOOGLE_FILE = 'application/vnd.google-apps.file',
  GOOGLE_FOLDER = 'application/vnd.google-apps.folder',
  GOOGLE_FORM = 'application/vnd.google-apps.form',
  GOOGLE_FUSIONTABLE = 'application/vnd.google-apps.fusiontable',
  GOOGLE_JAMBOARD = 'application/vnd.google-apps.jam',
  GOOGLE_MAP = 'application/vnd.google-apps.map',
  GOOGLE_PHOTO = 'application/vnd.google-apps.photo',
  GOOGLE_PRESENTATION = 'application/vnd.google-apps.presentation',
  GOOGLE_SCRIPT = 'application/vnd.google-apps.script',
  GOOGLE_SHORTCUT = 'application/vnd.google-apps.shortcut',
  GOOGLE_SITE = 'application/vnd.google-apps.site',
  GOOGLE_SPREADSHEET = 'application/vnd.google-apps.spreadsheet',
  GOOGLE_UNKNOWN = 'application/vnd.google-apps.unknown',
  GOOGLE_VIDEO = 'application/vnd.google-apps.video',

  // Documents
  MICROSOFT_WORD = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  OPEN_DOCUMENT_TEXT = 'application/vnd.oasis.opendocument.text', // .odt
  RICH_TEXT = 'application/rtf', // RTF
  PDF = 'application/pdf', // .pdf
  TEXT = 'text/plain', // .txt
  ZIP = 'application/zip', // ZIP
  EPUB = 'application/epub+zip', // .epub

  // Spreadsheets
  MICROSOFT_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  OPEN_DOCUMENT_SPREADSHEET = 'application/x-vnd.oasis.opendocument.spreadsheet', // .ods
  CSV = 'text/csv', // .csv
  TSV = 'text/tab-separated-values', // .tsv

  // Presentations
  MICROSOFT_POWERPOINT = 'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  OPEN_DOCUMENT_PRESENTATION = 'application/vnd.oasis.opendocument.presentation', // .odp

  // Drawings
  JPEG = 'image/jpeg', // .jpg
  PNG = 'image/png', // .png
  SVG = 'image/svg+xml', // .svg

  // Apps Scripts
  JSON = 'application/vnd.google-apps.script+json', // .json

  // Video
  MP4 = 'video/mp4', // .mp4
}

export enum FileExtension {
  // Documents
  DOCX = 'docx',
  ODT = 'odt',
  RTF = 'rtf',
  PDF = 'pdf',
  TXT = 'txt',
  ZIP = 'zip',
  EPUB = 'epub',

  // Spreadsheets
  XLSX = 'xlsx',
  ODS = 'ods',
  CSV = 'csv',
  TSV = 'tsv',

  // Presentations
  PPTX = 'pptx',
  ODP = 'odp',

  // Drawings
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',

  // Apps Scripts
  JSON = 'json',

  // Video
  MP4 = 'mp4',

  //Other MIME type
  OTHER = '',
}

export type NormalizedFileType = {
  mimeType: FileType;
  fileExtension: FileExtension;
};
