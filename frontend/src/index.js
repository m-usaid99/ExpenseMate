import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, GlobalStyles } from '@mui/material';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles styles={(theme) => ({
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        })} />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
