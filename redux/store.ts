import { configureStore } from "@reduxjs/toolkit";
import { HouseApi } from "./Slice/houseSlice";
import StateSlice from './Slice/StateSlice'
export const store = configureStore({
  reducer: {
    [HouseApi.reducerPath]: HouseApi.reducer,
    states:StateSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(HouseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
