const path = require('path');
const fs = require('fs');
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
  dependencies: {
    ...dependencies,
    'react-native-app-auth': {
      platforms: {
        android: null,
      },
    },
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
