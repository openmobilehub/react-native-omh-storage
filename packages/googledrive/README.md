<p align="center">
  <img width="500px" src="https://openmobilehub.org/wp-content/uploads/sites/13/2024/06/OpenMobileHub-horizontal-color.svg"/><br/>
  <h2 align="center">React Native OMH Storage - Google Drive (GMS / non-GMS)</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-googledrive"><img src="https://img.shields.io/npm/dm/@openmobilehub/storage-googledrive.svg?style=flat" alt="NPM downloads"/></a>
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-googledrive"><img src="https://img.shields.io/npm/v/@openmobilehub/storage-googledrive.svg?style=flat" alt="NPM version"/></a>
  <a href="https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@openmobilehub/storage-googledrive.svg?style=flat" alt="License"/></a>
</p>

<p align="center">
  <a href="https://discord.com/invite/yTAFKbeVMw"><img src="https://img.shields.io/discord/1115727214827278446.svg?style=flat&colorA=7289da&label=Chat%20on%20Discord" alt="Chat on Discord"/></a>
  <a href="https://twitter.com/openmobilehub"><img src="https://img.shields.io/twitter/follow/openmobilehub.svg?style=flat&colorA=1da1f2&colorB=&label=Follow%20on%20Twitter" alt="Follow on Twitter"/></a>
</p>

---

## Prerequisites

Before starting the integration, make sure the following packages are installed and configured:

- `@openmobilehub/storage-core`
- `react-native-file-access`
- `@react-native-async-storage/async-storage`
- `react-native-app-auth` - [Configuration](https://openmobilehub.github.io/react-native-omh-auth/docs/getting-started#ios-configuration)
- `@openmobilehub/auth-core` - [Configuration](https://openmobilehub.github.io/react-native-omh-auth/docs/getting-started#android-configuration)
- `@openmobilehub/auth-google` - [Configuration](https://openmobilehub.github.io/react-native-omh-auth/docs/google#configuration)

## Installation

```bash
npm add @openmobilehub/storage-googledrive
```

### Console App

To access Google Drive APIs, follow these steps to obtain the **Client ID**:

1. [Create a new app](https://developers.google.com/identity/protocols/oauth2/native-app#android) in [Google Cloud console](https://console.cloud.google.com/projectcreate).
2. Create an OAuth 2.0 Client ID Android application and specify your app's [**Package Name**](https://developer.android.com/build/configure-app-module#set-application-id) and [**SHA1 Fingerprint**](https://support.google.com/cloud/answer/6158849?authuser=1#installedapplications&zippy=%2Cnative-applications%2Candroid).
3. Enable [Google Drive API](https://support.google.com/googleapi/answer/6158841).

### Secrets

To securely configure the Google Drive storage provider, add the following entry to your project's **local.properties** file:

```bash title="android/local.properties"
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
```

## Usage

### Initializing

To interact with the Google Drive storage provider, start by initializing the [OMH Auth Client](https://openmobilehub.github.io/react-native-omh-auth/docs/google#initializing). Once the authentication client is set up, you can then initialize the OMH Storage Client.

```typescript
import GoogleAuthClient from '@openmobilehub/auth-google';
import { GoogleDriveStorageClient } from '@openmobilehub/storage-googledrive';

const scopes = [
  'openid',
  'profile',
  'email',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
];

await GoogleAuthClient.initialize({
  android: { scopes },
  ios: {
    scopes,
    clientId: '<YOUR_GOOGLE_CLIENT_ID>',
    redirectUrl: `com.googleusercontent.apps.${
      '<YOUR_GOOGLE_CLIENT_ID>'.split('.')[0]
    }:/oauth2redirect/google`,
  },
});

const googleDriveStorageClient = new GoogleDriveStorageClient(GoogleAuthClient);
```

### Other methods

Interacting with the Google Drive storage provider follows the same pattern as other storage providers since they all implement the [`IStorageClient`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/interfaces/IStorageClient#methods) interface. This uniformity ensures consistent functionality across different storage providers, so you won’t need to learn new methods regardless of the storage provider you choose! For a comprehensive list of available methods, refer to the [Getting Started](https://openmobilehub.github.io/react-native-omh-storage/docs/getting-started#usage) guide.

:::warning[CAVEATS]

The methods `downloadFile` and `downloadFileVersion` do not support [Google Workspace documents](https://developers.google.com/drive/api/guides/about-files#types:~:text=Google%20Workspace%20document,MIME%20types.) (Google Docs, Google Sheets, and Google Slides). To download Google Workspace documents, please use the `exportFile` method to export the file to a supported format.

The method `createPermission` will override `sendNotificationEmail` parameter to `true` when creating permission with `owner` role.

The method `updateFile` does not support [Google Workspace documents](https://developers.google.com/drive/api/guides/about-files#types:~:text=Google%20Workspace%20document,MIME%20types). It throws an error for Google Sheets and Slides and for Google Docs, it does not update the metadata (apart from file name) which can lead to unexpected behavior.


:::

## License

- See [LICENSE](https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE)
