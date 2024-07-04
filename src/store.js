// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expenses/expensesSlice";
import incomeReducer from "./features/income/incomeSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    // add other reducers here
    income: incomeReducer,
  },
});

export default store;
