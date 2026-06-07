import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Add your slice reducers here
    // example: counter: counterReducer,
  },
});

export default store;
