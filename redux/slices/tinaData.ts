import { createSlice } from "@reduxjs/toolkit";

import { MainPageQuery } from "./../../.tina/__generated__/types";

export const tinaDataSlice = createSlice({
  name: "tinaData",
  initialState: {} as MainPageQuery,
  reducers: {
    setTinaData: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setTinaData } = tinaDataSlice.actions;

export default tinaDataSlice.reducer;
