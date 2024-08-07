// src/selectors/combinedSelectors.js

import { createSelector } from "@reduxjs/toolkit";
import { selectExpenseTrendsData } from "../features/expenses/expensesSlice";
import { selectIncomeTrendsData } from "../features/income/incomeSlice";

export const selectCombinedTrendsData = createSelector(
  [selectExpenseTrendsData, selectIncomeTrendsData],
  (expenseTrends, incomeTrends) => {
    const { labels: expenseLabels, data: expenseData } = expenseTrends;
    const { labels: incomeLabels, data: incomeData } = incomeTrends;

    // Ensure both datasets have the same labels
    if (JSON.stringify(expenseLabels) !== JSON.stringify(incomeLabels)) {
      throw new Error("Income and Expense data labels do not match");
    }

    const combinedData = expenseLabels.map((label, index) => ({
      month: label,
      income: incomeData[index],
      expenses: expenseData[index],
    }));

    return combinedData;
  }
);

