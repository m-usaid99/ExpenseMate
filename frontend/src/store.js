// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expenses/expensesSlice";
import incomeReducer from "./features/income/incomeSlice";
import userReducer from "./features/user/userSlice";
import notificationReducer from "./features/notifications/notificationSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    income: incomeReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
