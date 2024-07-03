import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '../ThemeContext';

const Welcome = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <div>
      <Typography variant="h1" color="primary">
        Welcome to Finance Manager
      </Typography>
      <Button variant="contained" color="primary" onClick={toggleTheme}>
        Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </div>
  );
};

export default Welcome;
