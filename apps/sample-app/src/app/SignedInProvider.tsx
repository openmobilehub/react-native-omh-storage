import React from 'react';

import {
  GOOGLE_CLIENT_ID,
  // MICROSOFT_CLIENT_ID,
  // DROPBOX_CLIENT_ID,
  // DROPBOX_CLIENT_SECRET,
} from '@env';
import GoogleAuth from '@openmobilehub/auth-google';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROVIDER_NAMES = {
  GOOGLE: 'google',
  // MICROSOFT: 'microsoft',
  // DROPBOX: 'dropbox',
} as const;

type ObjectValues<T> = T[keyof T];

export type Providers = ObjectValues<typeof PROVIDER_NAMES>;

export async function getAuthProvider(provider: Providers) {
  switch (provider) {
    case PROVIDER_NAMES.GOOGLE:
      await GoogleAuth.initialize({
        android: {
          scopes: ['openid', 'profile', 'email'],
        },
        ios: {
          scopes: ['openid', 'profile', 'email'],
          clientId: GOOGLE_CLIENT_ID,
          redirectUrl: `com.googleusercontent.apps.${
            GOOGLE_CLIENT_ID?.split('.')[0]
          }:/oauth2redirect/google`,
        },
      });
      return GoogleAuth;
    // case PROVIDER_NAMES.MICROSOFT:
    //   await MicrosoftAuth.initialize({
    //     android: {
    //       scopes: ['User.Read'],
    //       configFileName: 'ms_auth_config',
    //     },
    //     ios: {
    //       scopes: ['User.Read', 'openid', 'profile', 'email', 'offline_access'],
    //       clientId: MICROSOFT_CLIENT_ID,
    //       redirectUrl: 'msauth.com.omh.auth.sample://auth/',
    //     },
    //   });
    //   return MicrosoftAuth;
    // case PROVIDER_NAMES.DROPBOX:
    //   await DropboxAuth.initialize({
    //     android: {
    //       scopes: ['account_info.read', 'sharing.read'],
    //     },
    //     ios: {
    //       scopes: ['account_info.read', 'sharing.read'],
    //       clientId: DROPBOX_CLIENT_ID,
    //       clientSecret: DROPBOX_CLIENT_SECRET,
    //       redirectUrl: 'com.omh.auth.sample://oauth',
    //     },
    //   });
    //   return DropboxAuth;
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
      const provider = (await AsyncStorage.getItem(
        'signed-in-provider'
      )) as Providers | null;

      setSignedInProvider(provider);
    })();
  }, []);

  async function signInWithProvider(provider: Providers | null) {
    if (provider == null) {
      await AsyncStorage.removeItem('signed-in-provider');
    } else {
      await AsyncStorage.setItem('signed-in-provider', provider);
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
