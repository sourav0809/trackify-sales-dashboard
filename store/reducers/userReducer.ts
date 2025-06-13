import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

interface LayoutConfig {
  lg: LayoutItem[];
  md: LayoutItem[];
  sm: LayoutItem[];
  xl: LayoutItem[];
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  dashboardLoading: boolean;
  layoutConfig: LayoutConfig;
}

// Initial state
const initialState: UserState = {
  user: null,
  token: "",
  isAuthenticated: false,
  dashboardLoading: true,
  layoutConfig: {
    lg: [],
    md: [],
    sm: [],
    xl: [],
  },
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    setDashboardLayout: (state, action: PayloadAction<LayoutConfig>) => {
      state.layoutConfig = action.payload;
    },

    setDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.dashboardLoading = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setDashboardLayout, setDashboardLoading, clearUser } =
  userSlice.actions;

// Types for dispatch
export type UserDispatch = (
  action: ReturnType<(typeof userSlice.actions)[keyof typeof userSlice.actions]>
) => void;
export type ThunkDispatch = AppDispatch;

export default userSlice.reducer;
