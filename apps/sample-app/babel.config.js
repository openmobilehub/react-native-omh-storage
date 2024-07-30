const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '../..');

const alias = {};

const packagesPath = path.join(root, 'packages');

for (const file of fs.readdirSync(packagesPath)) {
  const packageDirPath = path.join(packagesPath, file);
  const packageJsonPath = path.join(packageDirPath, 'package.json');
  const pak = require(packageJsonPath);

  alias[pak.name] = path.join(packageDirPath, pak.source);
}

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          ...alias,
          '@/app': './src/app',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/contexts': './src/contexts',
          '@/data': './src/data',
          '@/screens': './src/screens',
          '@/storage': './src/storage',
          '@/types': './src/@types',
          '@/utils': './src/utils',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        allowUndefined: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
