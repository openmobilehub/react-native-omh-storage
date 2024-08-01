import { Platform } from 'react-native';

import { LocalFile } from '@openmobilehub/storage-core';
import RNBlobUtil from 'react-native-blob-util';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const usePickFile = () => {
  const requestStoragePermission = async () => {
    const permissions = Platform.select({
      android: [
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ],
      ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
    });

    if (!permissions) {
      console.warn('Permissions are not defined for this platform');
      return false;
    }

    try {
      const statuses = await Promise.all(
        permissions.map((permission) => check(permission))
      );
      const allGranted = statuses.every((status) => status === RESULTS.GRANTED);

      if (!allGranted) {
        const requestStatuses = await Promise.all(
          permissions.map((permission) => request(permission))
        );
        return requestStatuses.every((status) => status === RESULTS.GRANTED);
      }

      return true;
    } catch (err) {
      console.warn('Failed to request permissions', err);
      return false;
    }
  };

  const pickFromFiles = async (): Promise<LocalFile | undefined> => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return;
    }

    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const filePath = response[0].uri.replace('file://', ''); // Remove file:// prefix as RNBlobUtil.fs.readFile requires it
      const base64Data = await RNBlobUtil.fs.readFile(filePath, 'base64');
      const { name, size, type, uri } = response[0];

      if (!name || !size || !type || !uri) {
        throw Error('Missing required asset properties');
      }

      return { name, size, type, uri, base64Data };
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const pickFromPhotoGallery = async (): Promise<LocalFile | null> => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return null;
    }

    return new Promise((resolve, reject) => {
      launchImageLibrary({ mediaType: 'mixed' }, async (response) => {
        if (response.didCancel) {
          resolve(null);
        } else if (response.errorCode) {
          reject(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];

          if (!asset.uri) {
            reject('Asset URI is missing');
            return;
          }

          const filePath = asset.uri.replace('file://', ''); // Remove file:// prefix as RNBlobUtil.fs.readFile requires it
          const base64Data = await RNBlobUtil.fs.readFile(filePath, 'base64');
          const { fileName, fileSize, type, uri } = asset;

          if (!fileName || !fileSize || !type) {
            reject('Missing required asset properties');
            return;
          }
          resolve({
            name: fileName,
            size: fileSize,
            type: type,
            uri: uri,
            base64Data,
          });
        } else {
          reject('No assets found');
        }
      });
    });
  };

  return {
    requestStoragePermission,
    pickFromFiles,
    pickFromPhotoGallery,
  };
};
