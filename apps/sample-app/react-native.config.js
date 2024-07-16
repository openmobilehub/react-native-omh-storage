const path = require('path');
const fs = require('fs');
const { configureProjects } = require('react-native-test-app');
const root = path.resolve(__dirname, '../..');

const dependencies = {};

const packagesPath = path.join(root, 'packages');

for (const file of fs.readdirSync(packagesPath)) {
  const packageDirPath = path.join(packagesPath, file);
  const packageJsonPath = path.join(packageDirPath, 'package.json');
  const pak = require(packageJsonPath);

  dependencies[pak.name] = { root: packageDirPath };
}

module.exports = {
  project: configureProjects({
    android: {
      sourceDir: 'android',
    },
    ios: {
      sourceDir: 'ios',
      automaticPodsInstallation: true,
    },
  }),
  dependencies,
};
