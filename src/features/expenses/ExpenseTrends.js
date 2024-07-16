import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const ExpenseTrends = ({ data }) => {
  const { labels, data: expenseData } = data;

  console.log('Expense Trends Component Data:', data);

  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5">Expense Trends</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 440, width: '100%', paddingTop: 2}}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <LineChart
            width={1000}
            height={400}
            series={[{ data: expenseData, label: 'Expenses' }]}
            xAxis={[{ data: labels, scaleType: 'point' }]}
            yAxis={[{ scaleType: 'linear' }]}
            margin={{ top: 20, bottom: 30, left: 50, right: 150 }}
            grid={{ horizontal: true, vertical: true }}
            slotProps={{ legend: {
              position: { vertical: 'top', horizontal: 'right'},
            }}}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ExpenseTrends;
