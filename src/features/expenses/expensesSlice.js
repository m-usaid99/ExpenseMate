import { createSlice } from '@reduxjs/toolkit';
import { parseISO, format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval, isWithinInterval } from 'date-fns';

const initialState = {
  expenses: [
    { id: 1, date: '2023-01-15', category: 'Utilities', amount: 100, tags: ['Monthly'], notes: '' },
    { id: 2, date: '2023-07-02', category: 'Rent', amount: 500, tags: ['Monthly'], notes: '' },
    { id: 3, date: '2023-02-20', category: 'Food', amount: 200, tags: ['Monthly'], notes: '' },
    { id: 4, date: '2023-03-05', category: 'Entertainment', amount: 150, tags: ['One-time'], notes: 'Concert tickets' },
    { id: 5, date: '2023-04-10', category: 'Transportation', amount: 300, tags: ['Monthly'], notes: 'Car maintenance' },
    { id: 6, date: '2023-05-25', category: 'Rent', amount: 500, tags: ['Monthly'], notes: '' },
    { id: 7, date: '2023-06-15', category: 'Utilities', amount: 120, tags: ['Monthly'], notes: '' },
    { id: 8, date: '2023-08-03', category: 'Food', amount: 180, tags: ['Monthly'], notes: '' },
    { id: 9, date: '2023-09-10', category: 'Entertainment', amount: 250, tags: ['One-time'], notes: 'Theater tickets' },
    { id: 10, date: '2023-10-12', category: 'Transportation', amount: 400, tags: ['Monthly'], notes: 'Public transport pass' },
  ],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({ ...action.payload, amount: parseFloat(action.payload.amount) });
    },
    editExpense: (state, action) => {
      const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = { ...action.payload, amount: parseFloat(action.payload.amount) };
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;

export const selectTotalExpenses = (state) => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11);

  const recentExpenses = state.expenses.expenses.filter(expense =>
    isWithinInterval(parseISO(expense.date), { start: startDate, end: endDate })
  );

  return recentExpenses.reduce((total, expense) => total + expense.amount, 0);
};


export const selectExpenseTrendsData = (state) => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11);

  const recentExpenses = state.expenses.expenses.filter(expense =>
    isWithinInterval(parseISO(expense.date), { start: startDate, end: endDate })
  );

  const months = eachMonthOfInterval({ start: startOfMonth(startDate), end: endOfMonth(endDate) });

  const aggregatedData = months.reduce((acc, month) => {
    const monthKey = format(month, 'yyyy-MM');
    acc[monthKey] = 0;
    return acc;
  }, {});

  recentExpenses.forEach(expense => {
    const month = format(parseISO(expense.date), 'yyyy-MM');
    aggregatedData[month] += parseFloat(expense.amount);
  });

  const sortedMonths = Object.keys(aggregatedData).sort((a, b) => new Date(a) - new Date(b));
  const labels = sortedMonths.map(month => format(parseISO(`${month}-01`), 'MMMM'));
  const data = sortedMonths.map(month => aggregatedData[month]);

  return { labels, data };
};

export default expensesSlice.reducer;
