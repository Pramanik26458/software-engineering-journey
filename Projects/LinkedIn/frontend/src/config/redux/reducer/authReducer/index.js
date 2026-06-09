import { createSlice } from "@reduxjs/toolkit";

import { loginUser, registerUser } from "../../action/authAction/index"; 

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: false,
  message: "",
  profileFetched: false,
  connections: [],
  connectionRequest: []
};

// ... keep the rest of your authSlice code below as is!

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    clearMessage: (state) => {
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      // ─── LOGIN CASES ───────────────────────────────────────────────────────
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Knocking the door...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload.user || action.payload; 
        state.message = "Login successful! Welcome back.";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "An unexpected login error occurred";
      })

      // ─── REGISTER CASES ────────────────────────────────────────────────────
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering your professional profile...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload.user || action.payload;
        state.message = "Registration successful! Welcome to the community.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "An unexpected registration error occurred";
      });
  }
});

export const { reset, clearMessage } = authSlice.actions;
export default authSlice.reducer;