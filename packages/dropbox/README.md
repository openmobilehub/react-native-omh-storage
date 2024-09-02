<p align="center">
  <img width="500px" src="https://openmobilehub.org/wp-content/uploads/sites/13/2024/06/OpenMobileHub-horizontal-color.svg"/><br/>
  <h2 align="center">React Native OMH Storage - Dropbox</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-dropbox"><img src="https://img.shields.io/npm/dm/@openmobilehub/storage-dropbox.svg?style=flat" alt="NPM downloads"/></a>
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-dropbox"><img src="https://img.shields.io/npm/v/@openmobilehub/storage-dropbox.svg?style=flat" alt="NPM version"/></a>
  <a href="https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@openmobilehub/storage-dropbox.svg?style=flat" alt="License"/></a>
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
- `@openmobilehub/auth-dropbox` - [Configuration](https://openmobilehub.github.io/react-native-omh-auth/docs/dropbox#configuration)

## Installation

```bash
npm add @openmobilehub/storage-dropbox
```

### Console App

To access Dropbox APIs, follow these steps to obtain the **Client App Key** and **Client App Secret**:

1. [Create a new app](https://developers.dropbox.com/oauth-guide) in [Dropbox Console](https://www.dropbox.com/developers/apps/create).
2. Specify `<YOUR_APPLICATION_ID>://oauth` as your redirect URL for your app.
3. Enable the `account_info.read`, `files.metadata.read`, `files.content.write`, `files.content.read`, `sharing.write` and `sharing.read` permission for your app.

### Secrets

To securely configure the Dropbox storage provider, add the following entry to your project's **local.properties** file:

```bash title="android/local.properties"
DROPBOX_CLIENT_ID=<YOUR_DROPBOX_APP_KEY>
```

## Usage

### Initializing

To interact with the Dropbox storage provider, start by initializing the [OMH Auth Client](https://openmobilehub.github.io/react-native-omh-auth/docs/dropbox#initializing). Once the authentication client is set up, you can then initialize the OMH Storage Client.

```typescript
import DropboxAuthClient from '@openmobilehub/auth-dropbox';
import { DropboxStorageClient } from '@openmobilehub/storage-dropbox';

const scopes = [
  'account_info.read',
  'files.metadata.read',
  'files.content.write',
  'files.content.read',
  'sharing.write',
  'sharing.read',
];

await DropboxAuth.initialize({
  android: { scopes },
  ios: {
    scopes,
    clientId: '<YOUR_DROPBOX_APP_KEY>',
    clientSecret: '<YOUR_DROPBOX_APP_SECRET>',
    redirectUrl: '<YOUR_REDIRECT_URL>',
  },
});

const dropboxStorageClient = new DropboxStorageClient(DropboxAuth);
```

### Other methods

Interacting with the Dropbox storage provider follows the same pattern as other storage providers since they all implement the [`IStorageClient`](https://ideal-doodle-m69lynw.pages.github.io/docs/api/core/src/interfaces/IStorageClient#methods) interface. This uniformity ensures consistent functionality across different storage providers, so you won’t need to learn new methods regardless of the storage provider you choose! For a comprehensive list of available methods, refer to the [Getting Started](https://ideal-doodle-m69lynw.pages.github.io/docs/getting-started#usage) guide.

:::warning[CAVEATS]

When updating a file, if the new file has a different name than the updated file, two additional versions might sometimes appear in the system. One version comes from updating the content of the file, and the other comes from updating the file name.

The `createPermission` method returns `null` when a permission is successfully created.

The `updatePermission` method returns `null` when a permission is successfully updated.

The `getWebUrl` method requires the folder to be a shared folder to return a web URL.

The `getFilePermissions` method requires the folder to be a shared folder to retrieve any permissions, including `owner` permission.

:::

## License

- See [LICENSE](https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE)
