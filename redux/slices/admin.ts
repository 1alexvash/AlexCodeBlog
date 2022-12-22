import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Admin = "true" | "false";

export const defaultPermissions = "false";

const initialState = defaultPermissions;

export const permissionsSlice = createSlice({
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

export const { setAdmin } = permissionsSlice.actions;

export default permissionsSlice.reducer;
