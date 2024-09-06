---
id: 'getting-started'
title: ''
sidebar_label: 'Getting Started'
---

# Getting started with React Native OMH Storage

React Native OMH Storage is a project that integrates various cloud storage providers to React Native. It offers a unified API to work with different storage providers.

## Prerequisites

Before getting started, the documentation assumes you are able to create a project with React Native. If you do not meet these prerequisites, follow the links below:

[React Native - Setting up the development environment](https://reactnative.dev/docs/environment-setup)

Additionally, the current versions of the Android OMH libraries require a minimum Android API level of **23** or **26** depending on chosen provider. To ensure your Android application builds successfully, set the `minSdkVersion` to at least **23** for Google Drive and Dropbox, or **26** for OneDrive, in your [**android/build.gradle**](https://github.com/openmobilehub/react-native-omh-storage/blob/main/apps/sample-app/android/build.gradle#L4) file, depending on the storage providers you plan to support.

## Installation

To integrate a storage provider into your React Native project, follow the specific steps for each provider:

- [Google Drive](https://openmobilehub.github.io/react-native-omh-storage/docs/googledrive)
- [OneDrive](https://openmobilehub.github.io/react-native-omh-storage/docs/onedrive)
- [Dropbox](https://openmobilehub.github.io/react-native-omh-storage/docs/dropbox)

## Usage

:::tip[GOOD TO KNOW]
Operations that can be performed on files can also be applied to folders.
:::

### Get root folder path

Retrieve the root folder ID of the storage service. Useful for listing files in the root folder.

```typescript
const rootFolderId = await storageClient.rootFolderId;
```

### List files

List files in a specific folder.

```typescript
const files = await storageClient.listFiles('folderId');
```

### Search files

Search for files with names containing the specified query.

```typescript
const searchResults = await storageClient.search('fileName');
```

### Create folder

Create a folder in a specific folder.

```typescript
const newFolder = await storageClient.createFolder(
  'folderName',
  'parentFolderId'
);
```

### Create file (with mime type)

Create a file with a specified MIME type in a folder.

```typescript
const newFile = await storageClient.createFileWithMimeType(
  'fileName',
  'fileMimeType',
  'parentFolderId'
);
```

### Create file (with extension)

Create a file with a specified extension in a folder.

```typescript
const newFile = await storageClient.createFileWithExtension(
  'fileName',
  'fileExtension',
  'parentFolderId'
);
```

### Update file

Update a file with the content of a local file.

```typescript
const updatedFile = await storageClient.updateFile(localFile, 'fileId');
```

### Delete file

Move a file to trash using its ID.

```typescript
await storageClient.deleteFile('fileId');
```

### Permanently Delete File

Permanently delete a file using its ID.

```typescript
await storageClient.permanentlyDeleteFile('fileId');
```

### Upload file

Upload a local file to a specific folder.

```typescript
const uploadedFile = await storageClient.localFileUpload(localFile, 'folderId');
```

### Download file

Download a file using its ID.

```typescript
await storageClient.downloadFile(file, 'saveDirectory');
```

### Export file

Export a file with a specific MIME type.

```typescript
await storageClient.exportFile(
  file,
  'mimeType',
  'fileExtension',
  'saveDirectory'
);
```

### Get file metadata

Retrieve the metadata of a file using its ID.

```typescript
const fileMetadata = await storageClient.getFileMetadata('fileId');
```

> For more details on file metadata support for each provider, please refer to the [File metadata documentation](https://github.com/openmobilehub/react-native-omh-storage/blob/main/README.md#file-metadata).

### Get file versions

Retrieve versions of a file using its ID.

```typescript
const fileVersions = await storageClient.getFileVersions('fileId');
```

### Download file version

Download a specific version of a file.

```typescript
await storageClient.downloadFileVersion(file, 'versionId', 'saveDirectory');
```

### Get file permissions

List the permissions of a file using its ID.

```typescript
const permissions = await storageClient.getPermissions('fileId');
```

For more details on file permissions support for each provider, please refer to the [File permissions documentation](https://github.com/openmobilehub/react-native-omh-storage/blob/main/README.md#file-permissions).

### Create file permission

Create a permission for a file.

```typescript
const newPermission = await storageClient.createPermission(
  'fileId',
  'role', // e.g., 'writer'
  { email: 'user@example.com' }, // Permission recipient
  true, // Send notification email
  'Optional message'
);
```

### Update file permission

Update the role of a permission for a file.

```typescript
const updatedPermission = await storageClient.updatePermission(
  'fileId',
  'permissionId',
  'newRole' // e.g., 'reader'
);
```

### Delete file permission

Delete a permission for a file.

```typescript
await storageClient.deletePermission('fileId', 'permissionId');
```

### Get file url

Retrieve the URL of a file.

```typescript
const fileUrl = await storageClient.getWebUrl('fileId');
```

---

For a more in depth view on the available methods, access the [Reference API](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/interfaces/IStorageClient).

## Sample app

Explore the [sample app](https://openmobilehub.github.io/react-native-omh-storage/docs/sample-app) included in the repository to see the implementation of storage with Google Drive and other storage providers. The sample app demonstrates the integration and usage of the various storage providers, providing a practical example to help you get started quickly.
