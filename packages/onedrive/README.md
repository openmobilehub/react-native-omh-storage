<p align="center">
  <img width="500px" src="https://openmobilehub.org/wp-content/uploads/sites/13/2024/06/OpenMobileHub-horizontal-color.svg"/><br/>
  <h2 align="center">React Native OMH Storage - OneDrive</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-onedrive"><img src="https://img.shields.io/npm/dm/@openmobilehub/storage-onedrive.svg?style=flat" alt="NPM downloads"/></a>
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-onedrive"><img src="https://img.shields.io/npm/v/@openmobilehub/storage-onedrive.svg?style=flat" alt="NPM version"/></a>
  <a href="https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@openmobilehub/storage-onedrive.svg?style=flat" alt="License"/></a>
</p>

<p align="center">
  <a href="https://discord.com/invite/yTAFKbeVMw"><img src="https://img.shields.io/discord/1115727214827278446.svg?style=flat&colorA=7289da&label=Chat%20on%20Discord" alt="Chat on Discord"/></a>
  <a href="https://twitter.com/openmobilehub"><img src="https://img.shields.io/twitter/follow/openmobilehub.svg?style=flat&colorA=1da1f2&colorB=&label=Follow%20on%20Twitter" alt="Follow on Twitter"/></a>
</p>

---

## Prerequisites

Before starting the integration, make sure the following packages are installed:

- `@openmobilehub/storage-core`
- `react-native-file-access`
- `@openmobilehub/auth-microsoft`

For OneDrive integration, you'll also need to make sure that the [`@openmobilehub/auth-microsoft`](https://www.npmjs.com/package/@openmobilehub/auth-microsoft) library is [configured](https://openmobilehub.github.io/react-native-omh-auth/docs/microsoft) properly.

## Installation

```bash
npm add @openmobilehub/storage-onedrive
```

### Console App

To access OneDrive APIs, follow these steps to obtain the **MSAL Configuration**:

1. [Create a new app](https://learn.microsoft.com/en-us/entra/identity-platform/tutorial-v2-android#register-your-application-with-microsoft-entra-id) in [Microsoft Azure](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade).
2. Add the **Android** platform and specify your [**Package Name**](https://developer.android.com/build/configure-app-module#set-application-id) and [**Signature Hash**](https://learn.microsoft.com/en-us/entra/identity-platform/tutorial-v2-android#register-your-application-with-microsoft-entra-id:~:text=In%20the%20Signature%20hash%20section%20of%20the%20Configure%20your%20Android%20app%20pane%2C%20select%20Generating%20a%20development%20Signature%20Hash.%20and%20copy%20the%20KeyTool%20command%20to%20your%20command%20line.) for your app.
3. Copy the **MSAL Configuration** into a newly created JSON file named **ms_auth_config.json** and place it in the **android/app/src/main/res/raw** directory.
4. In the **ms_auth_config.json** file, add a new key `"account_mode"` with the value `"SINGLE"`.

### Secrets

To securely configure the OneDrive storage provider, add the following entry to your project's **local.properties** file:

```bash title="android/local.properties"
MICROSOFT_SIGNATURE_HASH=<YOUR_MICROSOFT_SIGNATURE_HASH>
```

## Usage

### Initializing

To interact with the OneDrive storage provider, start by initializing the [OMH Auth Client](https://openmobilehub.github.io/react-native-omh-auth/docs/microsoft#initializing). Once the authentication client is set up, you can then initialize the OMH Storage Client.

```typescript
import MicrosoftAuth from '@openmobilehub/auth-microsoft';
import { OneDriveStorageClient } from '@openmobilehub/storage-onedrive';

const scopes = ['User.Read', 'Files.ReadWrite.All'];

await MicrosoftAuth.initialize({
  android: {
    scopes,
    configFileName: 'ms_auth_config',
  },
  ios: {
    scopes,
    clientId: '<YOUR_MICROSOFT_CLIENT_ID>',
    redirectUrl: 'msauth.<YOUR_PACKAGE_NAME>://auth/',
  },
});

const oneDriveStorageClient = new OneDriveStorageClient(MicrosoftAuth);
```

### Other methods

Interacting with the OneDrive storage provider follows the same pattern as other storage providers since they all implement the [`IStorageClient`](https://ideal-doodle-m69lynw.pages.github.io/docs/api/core/src/interfaces/IStorageClient#methods) interface. This uniformity ensures consistent functionality across different storage providers, so you won’t need to learn new methods regardless of the storage provider you choose! For a comprehensive list of available methods, refer to the [Getting Started](https://ideal-doodle-m69lynw.pages.github.io/docs/getting-started) guide.

:::warning[CAVEATS]

When updating a file, if the new file has a different name than the updated file, two additional versions might sometimes appear in the system. One version comes from updating the content of the file, and the other comes from updating the file name.

The [Sharing Links](https://learn.microsoft.com/en-us/graph/api/resources/permission?view=graph-rest-1.0#sharing-links) permissions are not supported.

The [search](https://learn.microsoft.com/en-us/graph/api/driveitem-search?view=graph-rest-1.0&tabs=java) query takes several fields including filename, metadata, and file content when searching.

:::

## License

- See [LICENSE](https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE)
