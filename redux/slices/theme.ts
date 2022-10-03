import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const initialState = {
  themeState: "light",
};

if (typeof window !== "undefined") {
  initialState.themeState = localStorage.theme;
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    resetTheme: () => {
      return initialState;
    },
    setThemeState: (state, action: PayloadAction<Theme>) => {
      state.themeState = action.payload;
    },
  },
});

export const { resetTheme, setThemeState } = themeSlice.actions;

export default themeSlice.reducer;
