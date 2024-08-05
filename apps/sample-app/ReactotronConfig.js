const Reactotron = require('reactotron-react-native').default;

Reactotron.configure({
  name: 'React Native Demo',
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();
