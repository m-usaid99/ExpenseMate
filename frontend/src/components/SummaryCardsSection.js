// src/components/SummaryCardsSection.js
import React from 'react';
import { Grid } from '@mui/material';
import SummaryCard from './SummaryCard';

const SummaryCardsSection = ({ totalExpenses, totalIncome, totalSavings }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Total Expenses" value={`$${totalExpenses.toFixed(1)}`} path="/expenses" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Total Income" value={`$${totalIncome.toFixed(1)}`} path="/income" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Remaining Budget" value="$1111.11" path="/budget" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Savings" value={`$${totalSavings.toFixed(1)}`} />
      </Grid>
    </Grid>
  );
};

export default SummaryCardsSection;
