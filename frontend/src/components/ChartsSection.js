// src/components/ChartsSection.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import ExpenseBreakdownChart from './charts/ExpenseBreakdownChart';
import IncomeVsExpensesChart from './charts/IncomeVsExpensesChart';
import BudgetTrackingChart from './charts/BudgetTrackingChart';

const ChartsSection = () => {
  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Expense Breakdown</Typography>
            <ExpenseBreakdownChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Income vs. Expenses</Typography>
            <IncomeVsExpensesChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Budget Tracking</Typography>
            <BudgetTrackingChart />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
