module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.tsx',
          '.ts',
          '.js',
          '.json',
          '.android.tsx',
          '.android.ts',
          '.android.jsx',
          '.android.js',
          'ios.tsx',
          'ios.ts',
          'ios.jsx',
          'ios.js',
        ],
        alias: {
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/contexts': './src/contexts',
          '@/data': './src/data',
          '@/navigation': './src/navigation',
          '@/screens': './src/screens',
          '@/storage': './src/storage',
          '@/types': './src/types',
          '@/utils': './src/utils',
          '@/hooks': './src/hooks',
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
