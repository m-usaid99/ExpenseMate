// src/components/SummaryCardsSection.js
import React from 'react';
import { Grid } from '@mui/material';
import SummaryCard from './SummaryCard';

const SummaryCardsSection = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Total Expenses" value="$1234.56" path="/expenses" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Total Income" value="$2345.67" path="/income" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Remaining Budget" value="$1111.11" path="/budget" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SummaryCard title="Savings" value="$789.10" path="/reports" />
      </Grid>
    </Grid>
  );
};

export default SummaryCardsSection;
