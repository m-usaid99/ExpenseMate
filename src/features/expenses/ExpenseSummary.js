import React from 'react';
import { Typography, Paper } from '@mui/material';

const ExpenseSummary = ({ totalExpenses }) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5">Total Expenses (Last 12 Months)</Typography>
      <Typography variant="h4">${totalExpenses}</Typography>
    </Paper>
  );
};

export default ExpenseSummary;
