// src/pages/Expenses.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

const Expenses = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Sidebar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, p: 3, marginLeft: 240, paddingTop: 64 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Expenses
          </Typography>
          <Box>ExpensesContent</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Expenses;
