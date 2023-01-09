import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Admin = true | false;

const initialState = false;

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      const admin = action.payload;
      localStorage.admin = admin;

      return (state = admin);
    },
  },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
