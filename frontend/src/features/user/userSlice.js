// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));  // Save to local storage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
