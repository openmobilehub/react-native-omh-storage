import type { LocalFile } from '@openmobilehub/storage-core';
import { FileSystem } from 'react-native-file-access';

export const createMultipartUploadBody = async (
  file: LocalFile,
  metadata: Record<string, any>,
  boundaryString: string
) => {
  const base64Data = await FileSystem.readFile(file.uri, 'base64');

  return (
    `--${boundaryString}\r\n` +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundaryString}\r\n` +
    `Content-Type: ${file.type}\r\n` +
    'Content-Transfer-Encoding: base64\r\n\r\n' +
    `${base64Data}\r\n` +
    `--${boundaryString}--`
  );
};
