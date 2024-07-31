import { AppRegistry, LogBox } from 'react-native';

import { App } from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  '[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.',
]);

AppRegistry.registerComponent(appName, () => App);
