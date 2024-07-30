import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
