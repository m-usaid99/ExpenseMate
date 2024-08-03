// src/components/ChartsSection.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ExpenseBreakdownChart from './charts/ExpenseBreakdownChart';
import MonthlyIncomeExpensesChart from './charts/MonthlyIncomeExpensesChart';
import BudgetTrackingChart from './charts/BudgetTrackingChart';

const ChartsSection = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Expense Breakdown</Typography>
        <ExpenseBreakdownChart />
      </Paper>
      <MonthlyIncomeExpensesChart />
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Budget Tracking</Typography>
        <BudgetTrackingChart />
      </Paper>
    </Box>
  );
};

export default ChartsSection;

