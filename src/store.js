// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './features/expenses/expensesSlice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    // add other reducers here
  },
});

export default store;
