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
          '.android.ts',
          '.android.tsx',
          'ios.ts',
          'ios.tsx',
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
