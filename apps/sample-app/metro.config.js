const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const fs = require('fs');
const escape = require('escape-string-regexp');

const root = path.resolve(__dirname, '../..');
const projectRoot = __dirname;
const packagesPath = path.join(root, 'packages');

const packageNames = fs.readdirSync(packagesPath);

const packages = packageNames.map((packageName) => {
  const packagePath = path.join(packagesPath, packageName);
  const pkgPath = path.join(packagePath, 'package.json');

  const pkg = require(pkgPath);

  return {
    name: pkg.name,
    path: packagePath,
    peerDependencies: Object.keys(pkg.peerDependencies),
  };
});

const exclusionPatterns = packages.flatMap((pkg) =>
  pkg.peerDependencies.map(
    (peerDependency) =>
      new RegExp(
        `^${escape(path.join(pkg.path, 'node_modules', peerDependency))}\\/.*$`
      )
  )
);

const watchFolders = [projectRoot, ...packages.map((pkg) => pkg.path)];

const nodeModulesPaths = watchFolders.map((folder) =>
  path.resolve(folder, 'node_modules')
);

const extraNodeModules = packages.reduce((acc, pkg) => {
  const sourcePath = path.join(pkg.path, 'src');

  acc[pkg.name] = sourcePath;

  return acc;
}, {});

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders,

  resolver: {
    blockList: exclusionList(exclusionPatterns),
    nodeModulesPaths,
    extraNodeModules,
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
