// src/ThemeContext.js
import React, { createContext, useMemo, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { useSelector } from 'react-redux';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const mode = useSelector((state) => state.user.theme);
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

