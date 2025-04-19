import { Sample } from "@/types/Sample";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Sample[] = [];

export const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Sample[]>) => {
      return action.payload;
    },
  },
});

export const { setData } = sampleSlice.actions;

export default sampleSlice.reducer;
