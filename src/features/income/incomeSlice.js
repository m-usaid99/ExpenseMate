import { createSlice } from "@reduxjs/toolkit";
import {
  parseISO,
  format,
  subMonths,
  eachMonthOfInterval,
  isWithinInterval,
} from "date-fns";

const initialState = {
  income: [
    { id: 1, date: "2023-01-15", category: "Salary", amount: 2500, tags: ["Monthly"], notes: "" },
    { id: 2, date: "2023-02-10", category: "Freelance", amount: 800, tags: ["One-time"], notes: "" },
    { id: 3, date: "2023-03-05", category: "Investment", amount: 1200, tags: ["Quarterly"], notes: "Stock dividends" },
    { id: 4, date: "2023-04-25", category: "Salary", amount: 2600, tags: ["Monthly"], notes: "" },
    { id: 5, date: "2023-05-15", category: "Freelance", amount: 600, tags: ["One-time"], notes: "" },
    { id: 6, date: "2023-06-05", category: "Investment", amount: 1100, tags: ["Quarterly"], notes: "Bond interest" },
    { id: 7, date: "2023-07-01", category: "Salary", amount: 2700, tags: ["Monthly"], notes: "" },
    { id: 8, date: "2023-08-15", category: "Freelance", amount: 900, tags: ["One-time"], notes: "" },
    { id: 9, date: "2023-09-10", category: "Investment", amount: 1500, tags: ["Quarterly"], notes: "Real estate rental" },
    { id: 10, date: "2023-10-25", category: "Salary", amount: 2800, tags: ["Monthly"], notes: "" },
    { id: 11, date: "2023-11-05", category: "Freelance", amount: 700, tags: ["One-time"], notes: "" },
    { id: 12, date: "2023-12-15", category: "Investment", amount: 1300, tags: ["Quarterly"], notes: "Mutual fund returns" },
    { id: 13, date: "2024-01-15", category: "Salary", amount: 2900, tags: ["Monthly"], notes: "" },
    { id: 14, date: "2024-02-10", category: "Freelance", amount: 1000, tags: ["One-time"], notes: "" },
    { id: 15, date: "2024-03-05", category: "Investment", amount: 1600, tags: ["Quarterly"], notes: "Stock dividends" },
    { id: 16, date: "2024-04-25", category: "Salary", amount: 3000, tags: ["Monthly"], notes: "" },
    { id: 17, date: "2024-05-15", category: "Freelance", amount: 800, tags: ["One-time"], notes: "" },
    { id: 18, date: "2024-06-05", category: "Investment", amount: 1400, tags: ["Quarterly"], notes: "Bond interest" },
    { id: 21, date: "2024-03-12", category: "Salary", amount: 3100, tags: ["Monthly"], notes: "" },
    { id: 22, date: "2024-04-18", category: "Freelance", amount: 900, tags: ["One-time"], notes: "" },
    { id: 23, date: "2024-05-30", category: "Investment", amount: 1700, tags: ["Quarterly"], notes: "Mutual fund returns" },
  ],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.income.push({
        ...action.payload,
        amount: parseFloat(action.payload.amount),
      });
    },
    editIncome: (state, action) => {
      const index = state.income.findIndex(
        (income) => income.id === action.payload.id
      );
      if (index !== -1) {
        state.income[index] = {
          ...action.payload,
          amount: parseFloat(action.payload.amount),
        };
      }
    },
    deleteIncome: (state, action) => {
      state.income = state.income.filter(
        (income) => income.id !== action.payload
      );
    },
  },
});

export const { addIncome, editIncome, deleteIncome } = incomeSlice.actions;

export const selectRecentIncome = (state) => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11);

  return state.income.income
    .filter((income) =>
      isWithinInterval(parseISO(income.date), {
        start: startDate,
        end: endDate,
      })
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const selectTotalIncome = (state) => {
  const recentIncome = selectRecentIncome(state);
  return recentIncome.reduce((total, income) => total + income.amount, 0);
};

export const selectIncomeTrendsData = (state) => {
  const recentIncome = selectRecentIncome(state);

  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 11),
    end: new Date(),
  });

  const aggregatedData = months.reduce((acc, month) => {
    const monthKey = format(month, "yyyy-MM");
    acc[monthKey] = 0;
    return acc;
  }, {});

  recentIncome.forEach((income) => {
    const month = format(parseISO(income.date), "yyyy-MM");
    aggregatedData[month] += parseFloat(income.amount);
  });

  const sortedMonths = Object.keys(aggregatedData).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const labels = sortedMonths.map((month) =>
    format(parseISO(`${month}-01`), "MMMM")
  );
  const data = sortedMonths.map((month) => aggregatedData[month]);

  return { labels, data };
};

export default incomeSlice.reducer;
