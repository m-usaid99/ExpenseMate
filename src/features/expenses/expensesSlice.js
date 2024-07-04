import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [
    { id: 1, date: '2023-07-01', category: 'Food', amount: 20, tags: ['Monthly'], notes: '' },
    { id: 2, date: '2023-07-02', category: 'Rent', amount: 500, tags: ['Monthly'], notes: '' },
    // Add more dummy data here if needed
  ],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    editExpense: (state, action) => {
      const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
