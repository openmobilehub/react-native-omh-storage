import { FileSystem } from 'react-native-file-access';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const requestAndroidPermission = async () => {
  const androidPermissions = [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

  try {
    const statuses = await Promise.all(
      androidPermissions.map((permission) => check(permission))
    );

    let allGranted = statuses.every((status) => status === RESULTS.GRANTED);

    if (allGranted) {
      return true;
    }

    const requestStatuses = await Promise.all(
      androidPermissions.map((permission) => request(permission))
    );

    allGranted = requestStatuses.every((status) => status === RESULTS.GRANTED);

    return allGranted;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const copyFileToDownloads = async (fileName: string, filePath: string) => {
  await requestAndroidPermission();

  await FileSystem.cpExternal(filePath, fileName, 'downloads');
};

export default copyFileToDownloads;
