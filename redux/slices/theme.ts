import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export const defaultTheme = "dark";

const initialState = defaultTheme;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      const theme = action.payload;
      localStorage.theme = theme;

      const body = document.querySelector("body");

      if (theme === "dark") {
        body?.classList.add("dark-theme");
      } else {
        body?.classList.remove("dark-theme");
      }

      return (state = theme);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
