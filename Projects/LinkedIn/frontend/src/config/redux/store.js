import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer/index"; // ✅ Path matches your reducer folder perfectly

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});