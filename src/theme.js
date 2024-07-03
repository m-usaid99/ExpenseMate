import { createTheme } from '@mui/material/styles';
import themeJson from './theme.json';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeJson.schemes.light.primary,
      contrastText: themeJson.schemes.light.onPrimary,
    },
    secondary: {
      main: themeJson.schemes.light.secondary,
      contrastText: themeJson.schemes.light.onSecondary,
    },
    background: {
      default: themeJson.schemes.light.background,
      paper: themeJson.schemes.light.surface,
    },
    text: {
      primary: themeJson.schemes.light.onBackground,
      secondary: themeJson.schemes.light.onSurface,
    },
    error: {
      main: themeJson.schemes.light.error,
      contrastText: themeJson.schemes.light.onError,
    },
  },
  typography: {
    fontFamily: 'Karla, sans-serif',
    h1: {
      fontFamily: 'Lato, sans-serif',
    },
    h2: {
      fontFamily: 'Lato, sans-serif',
    },
    h3: {
      fontFamily: 'Lato, sans-serif',
    },
    h4: {
      fontFamily: 'Lato, sans-serif',
    },
    h5: {
      fontFamily: 'Lato, sans-serif',
    },
    h6: {
      fontFamily: 'Lato, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Lato, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Lato, sans-serif',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: themeJson.schemes.dark.primary,
      contrastText: themeJson.schemes.dark.onPrimary,
    },
    secondary: {
      main: themeJson.schemes.dark.secondary,
      contrastText: themeJson.schemes.dark.onSecondary,
    },
    background: {
      default: themeJson.schemes.dark.background,
      paper: themeJson.schemes.dark.surface,
    },
    text: {
      primary: themeJson.schemes.dark.onBackground,
      secondary: themeJson.schemes.dark.onSurface,
    },
    error: {
      main: themeJson.schemes.dark.error,
      contrastText: themeJson.schemes.dark.onError,
    },
  },
  typography: {
    fontFamily: 'Karla, sans-serif',
    h1: {
      fontFamily: 'Lato, sans-serif',
    },
    h2: {
      fontFamily: 'Lato, sans-serif',
    },
    h3: {
      fontFamily: 'Lato, sans-serif',
    },
    h4: {
      fontFamily: 'Lato, sans-serif',
    },
    h5: {
      fontFamily: 'Lato, sans-serif',
    },
    h6: {
      fontFamily: 'Lato, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Lato, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Lato, sans-serif',
    },
  },
});

export { lightTheme, darkTheme };
    