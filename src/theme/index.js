
import { DefaultTheme, DarkTheme } from 'react-native-paper';


export const theme_default = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

export const theme_dark = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#010101',
    drawer: '#121',
    text: '#fff'
  },
};

