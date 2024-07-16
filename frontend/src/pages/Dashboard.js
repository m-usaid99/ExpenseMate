// src/pages/Dashboard.js
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import SummaryCardsSection from '../components/SummaryCardsSection';
import ChartsSection from '../components/ChartsSection';
import RecentTransactions from '../components/RecentTransactions';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', p: 2}}>
      <NavBar />
      <Sidebar />

      <Container maxWidth="lg" sx={{ flexGrow: 1, p: 4, paddingTop: 6 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <SummaryCardsSection />
          <ChartsSection />
          <RecentTransactions />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
