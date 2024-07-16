import { createTheme } from '@mui/material/styles';
import themeJson from './theme.json';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeJson.schemes.light.primary,  // #595992
      contrastText: themeJson.schemes.light.onPrimary,  // #FFFFFF
    },
    secondary: {
      main: themeJson.schemes.light.secondary, // #5D5C71 
      contrastText: themeJson.schemes.light.onSecondary, // #FFFFFF
    },
    background: {
      default: "#FFFFFF",      
      paper: themeJson.schemes.light.surface, // #FCF8FF
    },
    text: {
      primary: themeJson.schemes.light.onBackground, // #1B1B21
      secondary: themeJson.schemes.light.onSurface, // #1B1B21
    },
    error: {
      main: themeJson.schemes.light.error, // #BA1A1A
      contrastText: themeJson.schemes.light.onError, //#FFFFFF
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
    