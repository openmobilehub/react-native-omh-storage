---
sidebar_position: 1
---

# Getting started

React Native OMH Auth is a project that brings various native auth providers to React Native. It provides a single API to use different auth providers:

## Prerequisites

Before getting started, the documentation assumes you are able to create a project with React Native. If you do not meet these prerequisites, follow the links below:

[React Native - Setting up the development environment](https://reactnative.dev/docs/environment-setup)

Additionally, the current versions of Android OMH libraries have a minimum Android API level requirement of **23**. In order for your Android application to build successfully, make sure that `minSdkVersion` is set to a value greater or equal to **23** in your [**android/build.gradle**](https://github.com/openmobilehub/react-native-omh-auth/blob/main/apps/sample-app/android/build.gradle#L4) file.

## Compatibility

| React Native | 1.0.3 |
| ------------ | ----- |
| 0.73.6       | ✅    |

## Installation

To integrate a React Native OMH Auth provider into your React Native project, you need to install one of the available libraries:

| Provider  | Package                         |
| --------- | ------------------------------- |
| Google    | `@openmobilehub/auth-google`    |
| Facebook  | `@openmobilehub/auth-facebook`  |
| Microsoft | `@openmobilehub/auth-microsoft` |
| Dropbox   | `@openmobilehub/auth-dropbox`   |

By running the following command:

```bash
npm add @openmobilehub/auth-<provider-name>
```

## Provider configuration

Each provider requires you to specify different secrets. Please follow the individual provider configuration:

- [Google](https://www.openmobilehub.com/react-native-omh-auth/docs/google#configuration)
- [Facebook](https://www.openmobilehub.com/react-native-omh-auth/docs/facebook#configuration)
- [Microsoft](https://www.openmobilehub.com/react-native-omh-auth/docs/microsoft#configuration)
- [Dropbox](https://www.openmobilehub.com/react-native-omh-auth/docs/dropbox#configuration)

## Android configuration

Each plugin requires that the `@openmobilehub/auth-core` module to be manually linked inside your Android application. Add the following line to your [**android/settings.gradle**](https://github.com/openmobilehub/react-native-omh-auth/blob/main/apps/sample-app/android/settings.gradle#L3) file:

```gradle title="android/settings.gradle" {3}
rootProject.name = 'Example'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
apply from: file("../node_modules/@openmobilehub/auth-core/android/native_modules.gradle")
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')
```

## iOS configuration

Each plugin requires that the [react-native-app-auth](https://www.npmjs.com/package/react-native-app-auth) dependency to be installed and configured inside your React Native application. Proceed to install it by running the following command:

```bash
npm add react-native-app-auth
```

Next, follow the [iOS Setup](https://www.npmjs.com/package/react-native-app-auth#ios-setup) guide in order finish the configuration.

In order to avoid any issues on the Android side, you have to [disable automatic linking](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library) for `react-native-app-auth` by adding the following lines to your [**react-native.config.js**](https://github.com/openmobilehub/react-native-omh-auth/blob/main/apps/sample-app/react-native.config.js#L2-L8) file:

```javascript title="react-native.config.js" {2-8}
module.exports = {
  dependencies: {
    'react-native-app-auth': {
      platforms: {
        android: null,
      },
    },
  },
};
```

Additionally, in order for the `@openmobilehub/auth-core` module to work correctly, please install the [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) dependency by running the following command:

```
npm add @react-native-async-storage/async-storage
```

## Usage

:::info

In this guide, we'll use the Google provider as an example. However, feel free to choose any other provider as the exposed methods are identical. They all inherit the [`IAuthModule`](https://openmobilehub.github.io) from the [`@openmobilehub/auth-core`](https://github.com/openmobilehub/react-native-omh-auth/tree/main/packages/core), ensuring consistency across different providers. This means you won't need to learn any additional methods regardless of the provider you choose!

:::

### Initializing

Before interacting with a provider, initialization is necessary. Each provider requires a specific configuration to be passed as an argument.

```typescript
import GoogleAuthClient from '@openmobilehub/auth-google';

await GoogleAuth.initialize({
  android: {
    scopes: ['openid', 'profile', 'email'],
  },
  ios: {
    scopes: ['openid', 'profile', 'email'],
    clientId: '<YOUR_GOOGLE_CLIENT_ID>',
    redirectUrl: `com.googleusercontent.apps.${
      '<YOUR_GOOGLE_CLIENT_ID>'.split('.')[0]
    }:/oauth2redirect/google`,
  },
});
```

### Sign in

Initiates the sign-in process with the provider.

```typescript
await GoogleAuthClient.signIn();
```

### Get access token

Retrieves the access token from the provider.

```typescript
const accessToken = await GoogleAuthClient.getAccessToken();
```

### Get user

Obtains user information for the current signed-in user. Returns an object of type [`OmhUserProfile`](https://openmobilehub.github.io).

```typescript
type OmhUserProfile = {
  name?: string;
  surname?: string;
  email?: string;
  profileImage?: string;
};

const user: OmhUserProfile = await GoogleAuthClient.getUser();
```

### Refresh access token

Refreshes the access token if it has expired.

```typescript
const newAccessToken = await GoogleAuthClient.refreshAccessToken();
```

### Revoke access token

Revokes the current access token.

```typescript
await GoogleAuthClient.revokeAccessToken();
```

### Sign out

Initiates the sign-out process with the provider.

```typescript
await GoogleAuthClient.signOut();
```

For a more in depth view on the available methods, access the [Reference API](https://openmobilehub.github.io).

## Sample app

Explore the [sample app](https://www.openmobilehub.com/react-native-omh-auth/docs/contributing#sample-app) included in the repository to see the implementation of authentication with Google and other providers.

## Troubleshooting

### 2 files found with path 'META-INF/DEPENDENCIES'

:::danger[Error]

2 files found with path 'META-INF/DEPENDENCIES' from inputs:<br/>\- ~/.gradle/caches/transforms-3/974cf06afa1f6a930c75c22e66ec0fcc/transformed/jetified-httpclient-4.5.13.jar<br/>\- ~/.gradle/caches/transforms-3/435f87d6658aae4740f0a56a1a48eac1/transformed/jetified-httpcore-4.4.15.jar

:::

If you see the above error during the android build process, please add the following code snippet to your [**android/app/build.gradle**](https://github.com/openmobilehub/react-native-omh-auth/blob/main/apps/sample-app/android/app/build.gradle#L135-L137) file:

```gradle title="android/app/build.gradle" {4-6}
android {
    // ... other build settings

    packagingOptions {
        resources.excludes.add("META-INF/DEPENDENCIES")
    }
}
```

Please also check the related [GitHub issue](https://github.com/dropbox/dropbox-sdk-java/issues/517) for more context to the problem.

### Unsupported class file major version 63

:::danger[Error]

Failed to transform jackson-core-2.15.0.jar (com.fasterxml.jackson.core:jackson-core:2.15.0) to match attributes \{artifactType=android-classes-jar, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=jar, org.gradle.status=release, org.gradle.usage=java-api\}

:::

If you see the above error during the android build process, please add the following code snippet to your [**android/gradle.properties**](https://github.com/openmobilehub/react-native-omh-auth/blob/main/apps/sample-app/android/gradle.properties#L43) file:

```gradle title="android/gradle.properties"
android.jetifier.ignorelist=jackson-core,fastdoubleparser
```

Please also check the related [GitHub issue](https://github.com/auth0/Auth0.Android/issues/598) for more context to the problem.
