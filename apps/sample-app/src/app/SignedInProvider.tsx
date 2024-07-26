import React from 'react';

import {
  DROPBOX_CLIENT_ID,
  DROPBOX_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  MICROSOFT_CLIENT_ID,
} from '@env';
import DropboxAuth from '@openmobilehub/auth-dropbox';
import GoogleAuth from '@openmobilehub/auth-google';
import MicrosoftAuth from '@openmobilehub/auth-microsoft';

import storage from '@/app/storage';

export const PROVIDER_NAMES = {
  GOOGLEDRIVE: 'Google Drive',
  ONEDRIVE: 'OneDrive',
  DROPBOX: 'Dropbox',
} as const;

type ObjectValues<T> = T[keyof T];

export type Providers = ObjectValues<typeof PROVIDER_NAMES>;

export async function getAuthProvider(provider: Providers) {
  switch (provider) {
    case PROVIDER_NAMES.GOOGLEDRIVE:
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
    case PROVIDER_NAMES.ONEDRIVE:
      await MicrosoftAuth.initialize({
        android: {
          scopes: ['User.Read', 'Files.ReadWrite.All'],
          configFileName: 'ms_auth_config',
        },
        ios: {
          scopes: [
            'User.Read',
            'Files.ReadWrite.All',
            'openid',
            'profile',
            'email',
            'offline_access',
          ],
          clientId: MICROSOFT_CLIENT_ID,
          redirectUrl:
            'msauth.com.openmobilehub.reactnative.storage.sample://auth/',
        },
      });
      return MicrosoftAuth;
    case PROVIDER_NAMES.DROPBOX:
      await DropboxAuth.initialize({
        android: {
          scopes: [
            'account_info.read',
            'files.metadata.read',
            'files.content.write',
            'files.content.read',
            'sharing.read',
          ],
        },
        ios: {
          scopes: [
            'account_info.read',
            'files.metadata.read',
            'files.content.write',
            'files.content.read',
            'sharing.read',
          ],
          clientId: DROPBOX_CLIENT_ID,
          clientSecret: DROPBOX_CLIENT_SECRET,
          redirectUrl: 'com.openmobilehub.reactnative.storage.sample://oauth',
        },
      });
      return DropboxAuth;
  }
}

type SignedInProviderContextValue = {
  signedInProvider: Providers | null;
  signInWithProvider: (provider: Providers | null) => void;
};

export const SignedInProviderContext =
  React.createContext<SignedInProviderContextValue>({
    signedInProvider: null,
    signInWithProvider: (_: Providers | null) => {},
  });

export default function SignedInProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signedInProvider, setSignedInProvider] =
    React.useState<Providers | null>(null);

  React.useEffect(() => {
    (async () => {
      const provider = (storage.getString('signed-in-provider') ??
        null) as Providers | null;

      setSignedInProvider(provider);
    })();
  }, []);

  async function signInWithProvider(provider: Providers | null) {
    if (provider == null) {
      storage.delete('signed-in-provider');
    } else {
      storage.set('signed-in-provider', provider);
    }

    setSignedInProvider(provider);
  }

  return (
    <SignedInProviderContext.Provider
      value={{ signedInProvider, signInWithProvider }}
    >
      {children}
    </SignedInProviderContext.Provider>
  );
}
