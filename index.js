import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Root} from './Root';
import {typography} from './src/functions';

typography()

AppRegistry.registerComponent(appName, () => Root);
