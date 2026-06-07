import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await API.post("/user/login", {
        email: credentials.email,
        password: credentials.password
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login authentication failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await API.post("/user/register", {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);