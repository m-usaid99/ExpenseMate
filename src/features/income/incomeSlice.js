import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  income: [
    { id: 1, date: '2023-07-01', category: 'Salary', amount: 2000, tags: ['Monthly'], notes: '' },
    { id: 2, date: '2023-07-05', category: 'Freelance', amount: 500, tags: ['One-time'], notes: '' },
    // Add more dummy data here if needed
  ],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.income.push(action.payload);
    },
    editIncome: (state, action) => {
      const index = state.income.findIndex(income => income.id === action.payload.id);
      if (index !== -1) {
        state.income[index] = action.payload;
      }
    },
    deleteIncome: (state, action) => {
      state.income = state.income.filter(income => income.id !== action.payload);
    },
  },
});

export const { addIncome, editIncome, deleteIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
