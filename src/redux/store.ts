import { configureStore } from "@reduxjs/toolkit";

import sampleReducer from "./slices/sample";
export const makeStore = () => {
  return configureStore({
    reducer: {
      sample: sampleReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
