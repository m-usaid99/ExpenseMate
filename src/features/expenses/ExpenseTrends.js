import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const ExpenseTrends = ({ data }) => {
  const { labels, data: expenseData } = data;

  console.log('Expense Trends Component Data:', data);

  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5">Expense Trends</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 320, width: '100%' }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <LineChart
            width={900}
            height={300}
            series={[{ data: expenseData, label: 'Expenses' }]}
            xAxis={[{ data: labels, scaleType: 'point' }]}
            yAxis={[{ scaleType: 'linear' }]}
            margin={{ top: 20, bottom: 20, left: 50, right: 50 }}
            grid={{ horizontal: true, vertical: true }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ExpenseTrends;
