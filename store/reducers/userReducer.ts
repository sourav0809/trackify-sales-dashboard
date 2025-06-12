import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  dashboardLoading: boolean;
}

// Initial state
const initialState: UserState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  dashboardLoading: false,
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    setDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.dashboardLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setDashboardLoading, clearUser, clearError } =
  userSlice.actions;

// Types for dispatch
export type UserDispatch = (
  action: ReturnType<(typeof userSlice.actions)[keyof typeof userSlice.actions]>
) => void;
export type ThunkDispatch = AppDispatch;

export default userSlice.reducer;
