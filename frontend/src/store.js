// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expenses/expensesSlice";
import incomeReducer from "./features/income/incomeSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    income: incomeReducer,
    user: userReducer,
  },
});

export default store;
