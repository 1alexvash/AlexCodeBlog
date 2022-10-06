import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const checkStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.theme;
  }
};

const initialState = {
  themeState: "dark", // can not set localstorage bcs error "localstorage is not defined" bcs server start at first
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeState: (state, action: PayloadAction<Theme>) => {
      state.themeState = action.payload;
    },
  },
});

export const { setThemeState } = themeSlice.actions;

export default themeSlice.reducer;
