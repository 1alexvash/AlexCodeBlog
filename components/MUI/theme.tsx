import { createTheme, Theme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

const themeOptions = {
  palette: {
    mode: "dark",
  },
};

export const getTheme = (currentMode: ThemeMode): Theme => {
  const paletteMode = currentMode === "light" ? "light" : "dark";

  return createTheme({
    palette: { ...themeOptions.palette, mode: paletteMode },
  });
};
