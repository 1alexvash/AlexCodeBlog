import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    resetPaginationPage: () => {
      return initialState;
    },
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { resetPaginationPage, setPaginationPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
