import { Platform } from 'react-native';

import {
  getMimeTypeFromExtension,
  LocalFile,
} from '@openmobilehub/storage-core';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const usePickFile = () => {
  const requestStoragePermission = async () => {
    const permissions = Platform.select({
      android: [],
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
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
        mode: 'open',
      });

      const { name, size, uri } = response;
      const type = getTypeOrFromExtension(response.type, name);

      if (!name || size == null || !uri) {
        throw Error('Missing required asset properties');
      }

      return { name, size, type, uri };
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

          const { fileName, fileSize, uri } = asset;
          const type = getTypeOrFromExtension(asset.type, fileName);

          if (!fileName || fileSize === undefined) {
            reject('Missing required asset properties');
            return;
          }
          resolve({
            name: fileName,
            size: fileSize,
            type: type,
            uri: uri,
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

const getTypeOrFromExtension = (type?: string | null, name?: string | null) => {
  if (type) {
    return type;
  }

  if (name) {
    return getMimeTypeFromExtension(name);
  }
};
