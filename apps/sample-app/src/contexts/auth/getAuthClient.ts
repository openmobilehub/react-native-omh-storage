import {
  DROPBOX_CLIENT_ID,
  DROPBOX_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  MICROSOFT_CLIENT_ID,
} from '@env';
import DropboxAuth from '@openmobilehub/auth-dropbox';
import GoogleAuth from '@openmobilehub/auth-google';
import MicrosoftAuth from '@openmobilehub/auth-microsoft';

import { Provider } from '@/constants/provider';

export const initAuthClient = async (provider: Provider) => {
  switch (provider) {
    case Provider.GOOGLEDRIVE:
      await GoogleAuth.initialize({
        android: {
          scopes: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
          ],
        },
        ios: {
          scopes: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
          ],
          clientId: GOOGLE_CLIENT_ID,
          redirectUrl: `com.googleusercontent.apps.${
            GOOGLE_CLIENT_ID?.split('.')[0]
          }:/oauth2redirect/google`,
        },
      });
      return GoogleAuth;
    case Provider.ONEDRIVE:
      await MicrosoftAuth.initialize({
        android: {
          scopes: ['User.Read', 'Files.ReadWrite.All'],
          configFileName: 'ms_auth_config',
        },
        ios: {
          scopes: ['User.Read', 'Files.ReadWrite.All'],
          clientId: MICROSOFT_CLIENT_ID,
          redirectUrl:
            'msauth.com.openmobilehub.reactnative.storage.sample://auth/',
        },
      });
      return MicrosoftAuth;
    case Provider.DROPBOX:
      await DropboxAuth.initialize({
        android: {
          scopes: [
            'account_info.read',
            'files.metadata.read',
            'files.content.write',
            'files.content.read',
            'sharing.write',
            'sharing.read',
          ],
        },
        ios: {
          scopes: [
            'account_info.read',
            'files.metadata.read',
            'files.content.write',
            'files.content.read',
            'sharing.write',
            'sharing.read',
          ],
          clientId: DROPBOX_CLIENT_ID,
          clientSecret: DROPBOX_CLIENT_SECRET,
          redirectUrl: 'com.openmobilehub.reactnative.storage.sample://oauth',
        },
      });
      return DropboxAuth;
  }
};
