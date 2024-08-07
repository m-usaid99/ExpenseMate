// src/components/ChartsSection.js
import React from 'react';
import { Box } from '@mui/material';
import ExpenseBreakdownChart from './charts/ExpenseBreakdownChart';
import MonthlyIncomeExpensesChart from './charts/MonthlyIncomeExpensesChart';
import SavingsChart from './charts/SavingsChart';

const ChartsSection = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      <MonthlyIncomeExpensesChart />
      <ExpenseBreakdownChart />
      <SavingsChart />
    </Box>
  );
};

export default ChartsSection;

