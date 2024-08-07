import React, { useEffect } from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useSelector, useDispatch } from "react-redux";
import { selectExpenseTrendsData, fetchExpensesAsync } from "../../features/expenses/expensesSlice";
import { selectIncomeTrendsData, fetchIncomesAsync } from "../../features/income/incomeSlice";

const calculateSavings = (incomeData, expenseData) => {
  const savingsData = incomeData.labels.map((label, index) => ({
    month: label,
    savings: incomeData.data[index] - expenseData.data[index],
  }));

  const labels = savingsData.map((data) => data.month);
  const data = savingsData.map((data) => data.savings);

  return { labels, data };
};

const SavingsChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const expenseTrendsData = useSelector(selectExpenseTrendsData);
  const incomeTrendsData = useSelector(selectIncomeTrendsData);

  useEffect(() => {
    dispatch(fetchExpensesAsync());
    dispatch(fetchIncomesAsync());
  }, [dispatch]);

  const savingsData = calculateSavings(incomeTrendsData, expenseTrendsData);

  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5">Savings Over Time</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
          width: "100%",
          paddingTop: 2,
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <LineChart
            width={900}
            height={375}
            series={[
              {
                data: savingsData.data,
                label: "Savings",
                color: theme.palette.primary.main,
              },
            ]}
            xAxis={[{ data: savingsData.labels, scaleType: "point" }]}
            yAxis={[{ scaleType: "linear" }]}
            margin={{ top: 20, bottom: 50, left: 50, right: 150 }}
            grid={{ horizontal: true, vertical: true }}
            slotProps={{
              legend: {
                position: { vertical: "top", horizontal: "right" },
                direction: "row",
                marginTop: 10,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default SavingsChart;

