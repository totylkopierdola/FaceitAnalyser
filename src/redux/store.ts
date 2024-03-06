import { configureStore } from "@reduxjs/toolkit";
import { playerStatsSlice } from "./features/slice";

export const store = configureStore({
  reducer: { playerStatsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
