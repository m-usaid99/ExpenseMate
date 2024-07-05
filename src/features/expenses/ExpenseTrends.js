import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ExpenseTrends = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this option to control the aspect ratio
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Trends',
      },
    },
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5">Expense Trends</Typography>
      <Box sx={{ height: 300, width: '70%' }}> {/* Adjust the height and width as needed */}
        <Line data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default ExpenseTrends;
