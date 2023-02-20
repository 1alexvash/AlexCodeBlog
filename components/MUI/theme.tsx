import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

export type ThemeMode = Theme["palette"]["mode"];

export const getTheme = (currentMode: ThemeMode) => {
  const lightThemeBasics = createTheme({});

  const darkThemeBasics = createTheme({});

  const themeBasics =
    currentMode === "light" ? lightThemeBasics : darkThemeBasics;

  return createTheme(themeBasics, {} as ThemeOptions);
};
