// src/features/income/incomeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIncomes, addIncome, updateIncome, deleteIncome } from '../../api/incomeService';
import { parseISO, format, subMonths, eachMonthOfInterval } from 'date-fns';

export const fetchIncomesAsync = createAsyncThunk('expenses/fetchIncomes', async () => {
  const response = await fetchIncomes();
  return response;
});

export const addIncomeAsync = createAsyncThunk('income/addIncome', async (incomeData, thunkAPI) => {
  try {
    const newIncome = await addIncome(incomeData);
    return newIncome;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateIncomeAsync = createAsyncThunk('income/updateIncome', async ({ id, incomeData }, thunkAPI) => {
  try {
    const updatedIncome = await updateIncome(id, incomeData);
    return updatedIncome;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteIncomeAsync = createAsyncThunk('income/deleteIncome', async (id, thunkAPI) => {
  try {
    await deleteIncome(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  incomes: [],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    // Synchronous actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomesAsync.fulfilled, (state, action) => {
        state.incomes = action.payload;
        state.loading = false;
      })
      .addCase(fetchIncomesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(addIncomeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncomeAsync.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
        state.loading = false;
      })
      .addCase(addIncomeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateIncomeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncomeAsync.fulfilled, (state, action) => {
        const index = state.incomes.findIndex(income => income._id === action.payload._id);
        if (index !== -1) {
          state.incomes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateIncomeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteIncomeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncomeAsync.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(income => income._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteIncomeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectTotalIncome = (state) => {
  return state.income.incomes.reduce((total, income) => total + income.amount, 0)
};

export const selectIncomeTrendsData = (state) => {
  const incomes = state.income.incomes;
  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 11),
    end: new Date(),
  });

  const aggregatedData = months.reduce((acc, month) => {
    const monthKey = format(month, 'yyyy-MM');
    acc[monthKey] = 0;
    return acc;
  }, {});

  incomes.forEach((income) => {
    const month = format(parseISO(income.date), 'yyyy-MM');
    aggregatedData[month] += parseFloat(income.amount);
  });

  const sortedMonths = Object.keys(aggregatedData).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const labels = sortedMonths.map((month) =>
    format(parseISO(`${month}-01`), 'MMMM')
  );
  const data = sortedMonths.map((month) => aggregatedData[month]);

  return { labels, data };
};

export default incomeSlice.reducer;

