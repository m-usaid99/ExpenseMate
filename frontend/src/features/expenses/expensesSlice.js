import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subMonths, parseISO, format, eachMonthOfInterval } from "date-fns";
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from "../../api/expenseService";

export const fetchExpensesAsync = createAsyncThunk('expenses/fetchExpenses', async () => {
  const response = await fetchExpenses();
  return response;
});

export const addExpenseAsync = createAsyncThunk("expenses/addExpense", async (expenseData, thunkAPI) => {
  try {
    const newExpense = await addExpense(expenseData);
    return newExpense;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const updateExpenseAsync = createAsyncThunk('expenses/updateExpense', async ({ id, expenseData }, thunkAPI) => {
  try {
    const updatedExpense = await updateExpense(id, expenseData);
    return updatedExpense;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteExpenseAsync = createAsyncThunk("expenses/deleteExpense",
  async (id, thunkAPI) => {
    try {
      await deleteExpense(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesAsync.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.loading = false;
        state.lastFetched = Date.now();
      })
      .addCase(fetchExpensesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpenseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpenseAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addExpenseAsync.rejected, (state, action) => {
        state.expenses.push(action.payload);
        state.loading = false;
      })
      .addCase(updateExpenseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateExpenseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExpenseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.incomes = state.expenses.filter(income => income._id !== action.payload);
        state.loading = false;
      })
      .addCase((deleteExpenseAsync.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const selectTotalExpenses = (state) => {
  return state.expenses.expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const selectExpenseTrendsData = (state) => {
  const expenses = state.expenses.expenses;
  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 11),
    end: new Date(),
  });

  const aggregatedData = months.reduce((acc, month) => {
    const monthKey = format(month, "yyyy-MM");
    acc[monthKey] = 0;
    return acc;
  }, {});

  expenses.forEach((expense) => {
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
  console.log(data);
  return { labels, data };
};

export default expensesSlice.reducer;

