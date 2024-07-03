// src/components/MainLayout.js
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 240, paddingTop: 64 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
