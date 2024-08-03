// src/components/ChartsSection.js
import React from 'react';
import { Box } from '@mui/material';
import ExpenseBreakdownChart from './charts/ExpenseBreakdownChart';
import MonthlyIncomeExpensesChart from './charts/MonthlyIncomeExpensesChart';

const ChartsSection = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      <MonthlyIncomeExpensesChart />
      <ExpenseBreakdownChart />
    </Box>
  );
};

export default ChartsSection;

