<p align="center">
  <img width="500px" src="https://openmobilehub.org/wp-content/uploads/sites/13/2024/06/OpenMobileHub-horizontal-color.svg"/><br/>
  <h2 align="center">React Native OMH Storage</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-core"><img src="https://img.shields.io/npm/dm/@openmobilehub/storage-core.svg?style=flat" alt="NPM downloads"/></a>
  <a href="https://www.npmjs.com/package/@openmobilehub/storage-core"><img src="https://img.shields.io/npm/v/@openmobilehub/storage-core.svg?style=flat" alt="NPM version"/></a>
  <a href="https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@openmobilehub/storage-core.svg?style=flat" alt="License"/></a>
</p>

<p align="center">
  <a href="https://discord.com/invite/yTAFKbeVMw"><img src="https://img.shields.io/discord/1115727214827278446.svg?style=flat&colorA=7289da&label=Chat%20on%20Discord" alt="Chat on Discord"/></a>
  <a href="https://twitter.com/openmobilehub"><img src="https://img.shields.io/twitter/follow/openmobilehub.svg?style=flat&colorA=1da1f2&colorB=&label=Follow%20on%20Twitter" alt="Follow on Twitter"/></a>
</p>

---

**React Native OMH Storage** streamlines connecting your React Native app to various cloud storage providers by providing lightweight bridges to native OMH Storage SDKs on both iOS and Android. It supports both Google Mobile Services (GMS) and non-GMS configurations, making it easy to incorporate Google Drive, OneDrive and Dropbox storage providers.

## Features

- 📱 GMS and non-GMS support for all storage providers
- 🖇️ Identical API across all storage providers
- 📦 Official storage provider SDK integration
- 🚀 Easy configuration and setup
- 💨 Lightweight modules

## OMH Storage Modules

This is the main directory of the mono-repo for React Native OMH Storage. If you're searching for a particular package, please click on the corresponding package link below.

- [Google Drive](https://openmobilehub.github.io/react-native-omh-storage/docs/googledrive)
- [OneDrive](https://openmobilehub.github.io/react-native-omh-storage/onedrive)
- [Dropbox](https://openmobilehub.github.io/react-native-omh-storage/dropbox)

## Documentation

- [Getting Started](https://openmobilehub.github.io/react-native-omh-storage/docs/getting-started)
- [Reference API](https://openmobilehub.github.io/react-native-omh-storage/docs/api/)

## Supported functionality

- ✅ - supported
- 🟨 - partially supported
- ❌ - not supported

| Features                     | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| ---------------------------- | :----------------: | :--------------------: | :------: | :-----: |
| File listing                 |         ✅         |           ✅           |    ✅    |   ✅    |
| File searching               |         ✅         |           ✅           |    ✅    |   ✅    |
| Folder creation              |         ✅         |           ✅           |    ✅    |   ✅    |
| File creation (by mime type) |         ✅         |           ✅           |    ❌    |   ❌    |
| File creation (by extension) |         ❌         |           ❌           |    ✅    |   ✅    |
| File update                  |         ✅         |           ✅           |    ✅    |   ✅    |
| File deletion                |         ✅         |           ✅           |    ✅    |   ✅    |
| File permanent deletion      |         ✅         |           ✅           |    ❌    |   ❌    |
| File upload                  |         ✅         |           ✅           |    ✅    |   ✅    |
| File download                |         ✅         |           ✅           |    ✅    |   ✅    |
| File export                  |         ✅         |           ✅           |    ❌    |   ❌    |
| File metadata                |         ✅         |           ✅           |    🟨    |   🟨    |
| File versioning              |         ✅         |           ✅           |    ✅    |   ✅    |
| File permissions             |         🟨         |           🟨           |    🟨    |   🟨    |
| File URL                     |         ✅         |           ✅           |    ✅    |   ✅    |

### File metadata

<details>

<summary>Show details</summary>

[`File`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/classes/File#properties)

| Property     | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| ------------ | :----------------: | :--------------------: | :------: | :-----: |
| id           |         ✅         |           ✅           |    ✅    |   ✅    |
| name         |         ✅         |           ✅           |    ✅    |   ✅    |
| createdTime  |         ✅         |           ✅           |    🟨    |   🟨    |
| modifiedTime |         ✅         |           ✅           |    ✅    |   ✅    |
| parentId     |         ✅         |           ✅           |    ✅    |   ✅    |
| mimeType     |         ✅         |           ✅           |    ✅    |   ✅    |
| extension    |         ✅         |           ✅           |    ✅    |   ✅    |
| size         |         ✅         |           ✅           |    ✅    |   ✅    |

> **OneDrive, Dropbox**: On Android, the `createdTime` property cannot be retrieved for files.

[`Folder`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/classes/Folder#properties)

| Property     | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| ------------ | :----------------: | :--------------------: | :------: | :-----: |
| id           |         ✅         |           ✅           |    ✅    |   ✅    |
| name         |         ✅         |           ✅           |    ✅    |   ✅    |
| createdTime  |         ✅         |           ✅           |    🟨    |   ❌    |
| modifiedTime |         ✅         |           ✅           |    ✅    |   ❌    |
| parentId     |         ✅         |           ✅           |    ✅    |   ✅    |

> **OneDrive**: On Android, the `createdTime` property cannot be retrieved for folders.

</details>

### File permissions

<details>

<summary>Show details</summary>

[`Permission#properties`](https://openmobilehub.github.io/react-native-omh-storage/api/core/src/classes/Permission#properties)

| Property    | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| ----------- | :----------------: | :--------------------: | :------: | :-----: |
| id          |         ✅         |           ✅           |    ✅    |   🟨    |
| role        |         ✅         |           ✅           |    ✅    |   ✅    |
| isInherited |         🟨         |           🟨           |    ✅    |   ✅    |
| identity    |         ✅         |           ✅           |    ✅    |   ✅    |

> **Google Drive**: The `isInherited` property is available only for items in shared drives.

> **Dropbox**: The `id` corresponds to the underlying identity ID.

[`Permission#extended-by`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/classes/Permission#extended-by)

| Type        | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| ----------- | :----------------: | :--------------------: | :------: | :-----: |
| User        |         ✅         |           ✅           |    ✅    |   ✅    |
| Group       |         ✅         |           ✅           |    ✅    |   ✅    |
| Domain      |         ✅         |           ✅           |    ❌    |   ❌    |
| Anyone      |         ✅         |           ✅           |    ❌    |   ❌    |
| Device      |         ❌         |           ❌           |    ✅    |   ❌    |
| Application |         ❌         |           ❌           |    ✅    |   ❌    |

[`UserPermission`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/classes/UserPermission#properties)

| Property       | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| -------------- | :----------------: | :--------------------: | :------: | :-----: |
| id             |         ❌         |           ❌           |    ✅    |   ✅    |
| displayName    |         ✅         |           ✅           |    ✅    |   🟨    |
| emailAddress   |         ✅         |           ✅           |    ❌    |   ✅    |
| expirationTime |         ✅         |           ✅           |    ✅    |   ❌    |
| deleted        |         ✅         |           ✅           |    ❌    |   ❌    |
| photoLink      |         ✅         |           ✅           |    ❌    |   ❌    |
| pendingOwner   |         ❌         |           ✅           |    ❌    |   ❌    |

> **Dropbox**: Invited users who do not have a Dropbox account will not have a `displayName`.

[`GroupPermission`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/classes/GroupPermission#properties)

| Property       | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| -------------- | :----------------: | :--------------------: | :------: | :-----: |
| id             |         ❌         |           ❌           |    ✅    |   ✅    |
| displayName    |         ✅         |           ✅           |    ✅    |   ✅    |
| emailAddress   |         ✅         |           ✅           |    ❌    |   ❌    |
| expirationTime |         ✅         |           ✅           |    ✅    |   ❌    |
| deleted        |         ✅         |           ✅           |    ❌    |   ❌    |

[`PermissionRole`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/type-aliases/PermissionRole)

| Role      | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| --------- | :----------------: | :--------------------: | :------: | :-----: |
| owner     |         ✅         |           ✅           |    ✅    |   ✅    |
| writer    |         ✅         |           ✅           |    ✅    |   🟨    |
| commenter |         ✅         |           ✅           |    ❌    |   ✅    |
| reader    |         ✅         |           ✅           |    ✅    |   🟨    |

> **Dropbox**:
>
> - While the `reader` role is documented in the API, Dropbox does not support granting this role. Attempting to do so will throw an exception with the user message: `viewer_no_comment isn’t yet supported`.
> - Dropbox also does not support granting the `writer` role for uploaded files. Any attempt will result in an exception with the user message: `You don’t have permission to perform this action`.

[`PermissionRecipient`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/type-aliases/PermissionRecipient)

| Type         | Google Drive (GMS) | Google Drive (non-GMS) | OneDrive | Dropbox |
| ------------ | :----------------: | :--------------------: | :------: | :-----: |
| user         |         ✅         |           ✅           |    ✅    |   ✅    |
| group        |         ✅         |           ✅           |    ✅    |   ❌    |
| domain       |         ✅         |           ✅           |    ❌    |   ❌    |
| anyone       |         ✅         |           ✅           |    ❌    |   ❌    |
| objectId     |         ❌         |           ❌           |    ✅    |   ✅    |
| alias        |         ❌         |           ❌           |    ✅    |   ❌    |

> **Dropbox**: To invite a group, use `objectId` and provide the group ID.

</details>

## Contributing

- [Overview](https://openmobilehub.github.io/react-native-omh-storage/docs/contributing)
- [Issues](https://github.com/openmobilehub/react-native-omh-storage/issues)
- [PRs](https://github.com/openmobilehub/react-native-omh-storage/pulls)

## License

- See [LICENSE](https://github.com/openmobilehub/react-native-omh-storage/blob/main/LICENSE)
