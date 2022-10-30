import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export const defaultTheme = "light";

const initialState = defaultTheme;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      const theme = action.payload;
      localStorage.theme = theme;

      const html = document.querySelector("html");

      if (theme === "dark") {
        html?.classList.add("dark-theme");
      } else {
        html?.classList.remove("dark-theme");
      }

      return (state = theme);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
