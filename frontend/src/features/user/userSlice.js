import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as apiLogin,
  register as apiRegister,
  requestPasswordReset,
  resetPassword,
  updateUserProfile,
  updateUserSettings as apiUpdateUserSettings,
} from '../../api/userService';

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await apiLogin(credentials);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const response = await apiRegister(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUserSettingsAsync = createAsyncThunk('user/updateUserSettings', async (settings, thunkAPI) => {
  try {
    const response = await apiUpdateUserSettings(settings);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const requestPasswordResetAsync = createAsyncThunk('user/requestPasswordReset', async ({ email }, thunkAPI) => {
  try {
    const response = await requestPasswordReset(email);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const resetPasswordAsync = createAsyncThunk('user/resetPassword', async ({ token, password }, thunkAPI) => {
  try {
    const response = await resetPassword(token, password);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUserProfileAsync = createAsyncThunk(
  'user/updateUserProfile',
  async (profileData, thunkAPI) => {
    try {
      const response = await updateUserProfile(profileData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
    theme: localStorage.getItem('themeMode') || 'light', // Initialize theme from localStorage
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.theme); // Save theme preference to localStorage
    },
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
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestPasswordResetAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordResetAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(requestPasswordResetAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserSettingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSettingsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = {
          ...state.userInfo,
          settings: action.payload.settings,
        };
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));  // Save updated settings to local storage
      })
      .addCase(updateUserSettingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
