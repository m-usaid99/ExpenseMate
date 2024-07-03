// src/pages/Dashboard.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SummaryCardsSection from '../components/SummaryCardsSection';
import ChartsSection from '../components/ChartsSection';
import RecentTransactions from '../components/RecentTransactions';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <SummaryCardsSection />
        <ChartsSection />
        <RecentTransactions />
      </Box>
    </Container>
  );
};

export default Dashboard;
