import mimeTypes from 'mime-types';

export const getMimeTypeFromExtension = (
  extension?: string
): string | undefined => {
  if (!extension) {
    return undefined;
  }

  return mimeTypes.lookup(extension) || undefined;
};
