export const getExtensionFromFilePath = (
  filePath?: string
): string | undefined => {
  if (!filePath) {
    return undefined;
  }

  const parts = filePath.split('.');

  if (parts.length > 1) {
    return parts.pop();
  }

  return undefined;
};
