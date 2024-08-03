import React from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { selectExpenseTrendsData } from "../../features/expenses/expensesSlice";
import { selectIncomeTrendsData } from "../../features/income/incomeSlice";
import { subMonths, format } from "date-fns";

const MonthlyIncomeExpensesChart = () => {
  const theme = useTheme();
  const expenseTrendsData = useSelector(selectExpenseTrendsData);
  const incomeTrendsData = useSelector(selectIncomeTrendsData);

  // Filter and restructure data for the last 6 months
  const filterLast6Months = (data) => {
    const endDate = new Date();
    const startDate = subMonths(endDate, 6);

    const filteredData = data.labels
      .map((label, index) => ({
        month: label,
        value: data.data[index],
        date: new Date(`${label} 01, ${endDate.getFullYear()}`), // Convert label to date
      }))
      .filter(({ date }) => date >= startDate && date <= endDate);

    const labels = filteredData.map(({ month }) => month);
    const values = filteredData.map(({ value }) => value);

    return { labels, values };
  };

  const filteredExpenses = filterLast6Months(expenseTrendsData);
  const filteredIncomes = filterLast6Months(incomeTrendsData);

  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5">Monthly Income vs Expenses</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400, // Adjust height to fit the layout
          width: "100%",
          paddingTop: 2,
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <BarChart
            width={900} // Adjust width to fit the layout
            height={375} // Adjust height to fit the layout
            series={[
              {
                data: filteredIncomes.values,
                label: "Income",
                color: theme.palette.primary.main,
              },
              {
                data: filteredExpenses.values,
                label: "Expenses",
                color: theme.palette.secondary.main,
              },
            ]}
            xAxis={[{ data: filteredExpenses.labels, scaleType: "band" }]}
            yAxis={[{ scaleType: "linear" }]}
            margin={{ top: 20, bottom: 50, left: 40, right: 200 }} // Adjust margin for better spacing
            grid={{ horizontal: true, vertical: true }}
            slotProps={{
              legend: {
                position: { vertical: "top", horizontal: "right" }, // Position legend at the bottom center
                direction: "row", // Legend items in a row
                marginTop: 10, // Add margin at the top of the legend
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default MonthlyIncomeExpensesChart;

