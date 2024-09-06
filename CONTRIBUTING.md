# Contributing

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- An example app in the `apps/sample-app/` directory.
- The core library in the `packages/core/` directory.
- Provider packages in the `packages/*/` directories.

To get started with the project, run the following command in the root directory to install the required dependencies for each package:

```bash
yarn install
```

Since the project relies on Yarn workspaces, you cannot use [npm](https://github.com/npm/cli) for development.

## Sample App

The [Sample App](https://github.com/openmobilehub/react-native-omh-storage/tree/main/apps/sample-app) demonstrates usage of the library. To run the application, follow the instructions [here](https://openmobilehub.github.io/react-native-omh-storage/docs/sample-app).

## Linting

We use [TypeScript](https://www.typescriptlang.org) for type checking, and [ESLint](https://eslint.org) with [Prettier](https://prettier.io) for linting and formatting the code.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```bash
yarn lint
yarn typecheck
```

To fix formatting errors, run the following:

```bash
yarn lint --fix
```

## Creating a new plugin

You can create a new plugin by following the existing plugin structure:

- [Google Drive](https://github.com/openmobilehub/react-native-omh-storage/tree/main/packages/googledrive)
- [OneDrive](https://github.com/openmobilehub/react-native-omh-storage/tree/main/packages/onedrive)
- [Dropbox](https://github.com/openmobilehub/react-native-omh-storage/tree/main/packages/dropbox)

All providers should inherit the [`IStorageClient`](https://openmobilehub.github.io/react-native-omh-storage/docs/api/core/src/interfaces/IStorageClient) from the [@openmobilehub/storage-core](https://github.com/openmobilehub/react-native-omh-storage/tree/main/packages/core), to ensure consistency across different providers.

## Writing documentation

Documentation is located under the [/docs](https://github.com/openmobilehub/react-native-omh-storage/tree/main/docs) directory. We use [Docusaurus](https://docusaurus.io) to generate the documentation website, and [docusaurus-plugin-typedoc](https://www.npmjs.com/package/docusaurus-plugin-typedoc) to generate API documentation from TypeScript docstrings. The API documentation is built automatically with GitHub Actions and published on GitHub Pages upon merging to the `main` branch with [this workflow file](https://github.com/openmobilehub/react-native-omh-storage/tree/main/.github/workflows/deploy-docs.yml).

Remember to document your code according to the [JSDoc reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) and to manually write proper Markdown documentation when needed in the `/docs/docs/` directory.

To run the documentation locally, from the root directory, run the following command:

```bash
yarn docs start
```

## Publishing to npm

To publish a new version to npm, we use `lerna`. Packages are published automatically after merging a commit that contains a version bump.

1. Run `yarn create-release`
2. After merging the PR with the version bump, the package will be released automatically, and a corresponding git tag and release will be created by the GitHub Actions workflow.

## Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: Bug fixes, e.g. fix crash due to deprecated method.
- `feat`: New features, e.g. add new method to the module.
- `refactor`: Code refactor, e.g. migrate from class components to hooks.
- `docs`: Documentation changes, e.g. add usage example for the module.
- `test`: Adding or updating tests, e.g. add integration tests using Detox.
- `chore`: Tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

## Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
