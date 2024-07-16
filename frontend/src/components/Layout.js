import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '120px', pt: '100px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
