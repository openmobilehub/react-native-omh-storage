# Sample App

The Sample App is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the sample app. Changes to the library's JavaScript code will be reflected in the sample app without a rebuild, but native code changes will require a rebuild of the sample app.

To edit the Kotlin files, open `apps/sample-app/android` in Android Studio and find the source files at `openmobilehub_storage-core` under Android.

To start the sample app, run the following command in the root directory to install the required dependencies for each package:

```bash
yarn install
```

## Development Requirements

To develop, you must ensure that [React Native Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md) is run at least once, and after any changes to the native specs, it must be re-run. This is done by running the following command:

```bash
yarn codegen:android
```

### Environment setup

Before getting started, the documentation assumes you are able to create a project with React Native. If you do not meet these prerequisites, follow the links below:

[React Native - Setting up the development environment](https://reactnative.dev/docs/environment-setup)

### Install CocoaPods

Navigate to the `ios` directory and run the following command to install the required CocoaPods dependencies:

```bash
cd apps/sample-app/ios && pod install
```

### Providers setup

Before proceeding with the setup, ensure you have created an app for each service provider:

- [Google Drive](https://ideal-doodle-m69lynw.pages.github.io/docs/googledrive)
- [OneDrive](https://ideal-doodle-m69lynw.pages.github.io/docs/onedrive)
- [Dropbox](https://ideal-doodle-m69lynw.pages.github.io/docs/dropbox)

If you don't want to set up certain providers, you can leave their values empty.

#### Android

```bash
cp local.properties.sample local.properties
```

(In `apps/sample-app/android`)

#### iOS

```bash
cp .env.sample .env
```

(In `apps/sample-app`)

### Starting the Sample App

You can use various commands from the root directory to work with the project.

To start the packager:

```bash
yarn sample-app start
```

To run the example app on Android:

```bash
yarn sample-app android
```

To run the example app on iOS:

```bash
yarn sample-app ios
```
