import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import chartReducer from "./reducers/chartReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
