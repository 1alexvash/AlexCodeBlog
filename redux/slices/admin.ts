import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Admin = "true" | "false";

export const defaultPremissions = "false";

const initialState = defaultPremissions;

export const premissionsSlice = createSlice({
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

export const { setAdmin } = premissionsSlice.actions;

export default premissionsSlice.reducer;
