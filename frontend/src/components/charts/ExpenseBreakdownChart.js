// src/components/charts/ExpenseBreakdownChart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import chroma from 'chroma-js';

const ExpenseBreakdownChart = () => {
  const theme = useTheme();
  const expenses = useSelector((state) => state.expenses.expenses);

  const generateColorShades = (baseColor, numShades) => {
    return chroma.scale([chroma(baseColor).brighten(2), chroma(baseColor).darken(2)]).colors(numShades);
  };

  const aggregateExpensesByCategory = (expenses) => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    return categoryTotals;
  };

  const categoryTotals = aggregateExpensesByCategory(expenses);
  const colors = generateColorShades(theme.palette.primary.main, Object.keys(categoryTotals).length);
  console.log(categoryTotals);
  const data = Object.keys(categoryTotals).map((category, index) => ({
    label: category,
    value: categoryTotals[category],
    color: colors[index],
  }));

  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h6">Expense Breakdown By Category</Typography>
      <Box sx={{ height: 400 }}>
        <PieChart
          series={[
            {
              data,
              innerRadius: 75,
              outerRadius: 150,
              cornerRadius: 10,
              paddingAngle: 1,
            },
          ]}
          width={800}
          height={400}
        />
      </Box>
    </Paper>
  );
};

export default ExpenseBreakdownChart;


