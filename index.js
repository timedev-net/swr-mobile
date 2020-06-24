/**
 * @format
 */

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { theme_default, theme_dark } from './src/theme'

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme_default}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
