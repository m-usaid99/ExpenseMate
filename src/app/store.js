import { configureStore } from '@reduxjs/toolkit';

// Create a basic slice as a placeholder
const slice = {
  reducer: (state = {}, action) => state,
};

// Configure the store with the basic slice
export const store = configureStore({
  reducer: {
    placeholder: slice.reducer,
  },
});
