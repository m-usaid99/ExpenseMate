import { createSlice } from "@reduxjs/toolkit";
import {
  parseISO,
  format,
  subMonths,
  eachMonthOfInterval,
  isWithinInterval,
} from "date-fns";

const initialState = {
  expenses: [
    {
      id: 1,
      date: "2023-01-15",
      category: "Utilities",
      amount: 100,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 2,
      date: "2023-02-20",
      category: "Food",
      amount: 200,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 3,
      date: "2023-03-05",
      category: "Entertainment",
      amount: 150,
      tags: ["One-time"],
      notes: "Concert tickets",
    },
    {
      id: 4,
      date: "2023-04-10",
      category: "Transportation",
      amount: 300,
      tags: ["Monthly"],
      notes: "Car maintenance",
    },
    {
      id: 5,
      date: "2023-05-25",
      category: "Rent",
      amount: 500,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 6,
      date: "2023-06-15",
      category: "Utilities",
      amount: 120,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 7,
      date: "2023-07-02",
      category: "Rent",
      amount: 500,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 8,
      date: "2023-08-03",
      category: "Food",
      amount: 180,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 9,
      date: "2023-09-10",
      category: "Entertainment",
      amount: 250,
      tags: ["One-time"],
      notes: "Theater tickets",
    },
    {
      id: 10,
      date: "2023-10-12",
      category: "Transportation",
      amount: 400,
      tags: ["Monthly"],
      notes: "Public transport pass",
    },
    {
      id: 11,
      date: "2023-11-18",
      category: "Healthcare",
      amount: 200,
      tags: ["One-time"],
      notes: "Medical check-up",
    },
    {
      id: 12,
      date: "2023-12-22",
      category: "Shopping",
      amount: 300,
      tags: ["One-time"],
      notes: "Holiday gifts",
    },
    {
      id: 13,
      date: "2024-01-05",
      category: "Travel",
      amount: 800,
      tags: ["One-time"],
      notes: "Vacation",
    },
    {
      id: 14,
      date: "2024-02-14",
      category: "Education",
      amount: 150,
      tags: ["Monthly"],
      notes: "Online course",
    },
    {
      id: 15,
      date: "2024-03-08",
      category: "Food",
      amount: 220,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 16,
      date: "2024-04-16",
      category: "Rent",
      amount: 550,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 17,
      date: "2024-05-10",
      category: "Utilities",
      amount: 130,
      tags: ["Monthly"],
      notes: "",
    },
    {
      id: 18,
      date: "2024-06-18",
      category: "Entertainment",
      amount: 300,
      tags: ["One-time"],
      notes: "Concert tickets",
    },
  ],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({
        ...action.payload,
        amount: parseFloat(action.payload.amount),
      });
    },
    editExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = {
          ...action.payload,
          amount: parseFloat(action.payload.amount),
        };
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;

export const selectRecentExpenses = (state) => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11);

  return state.expenses.expenses
    .filter((expense) =>
      isWithinInterval(parseISO(expense.date), {
        start: startDate,
        end: endDate,
      })
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const selectTotalExpenses = (state) => {
  const recentExpenses = selectRecentExpenses(state);
  return recentExpenses.reduce((total, expense) => total + expense.amount, 0);
};

export const selectExpenseTrendsData = (state) => {
  const recentExpenses = selectRecentExpenses(state);

  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 11),
    end: new Date(),
  });

  const aggregatedData = months.reduce((acc, month) => {
    const monthKey = format(month, "yyyy-MM");
    acc[monthKey] = 0;
    return acc;
  }, {});

  recentExpenses.forEach((expense) => {
    const month = format(parseISO(expense.date), "yyyy-MM");
    aggregatedData[month] += parseFloat(expense.amount);
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

export default expensesSlice.reducer;
