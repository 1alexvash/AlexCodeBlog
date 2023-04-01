import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

import { mainColors } from "./colors";

const lightThemeConfig = createTheme({
  palette: { mode: "light", main: mainColors },
});

const darkThemeConfig = createTheme({
  palette: { mode: "dark", main: mainColors },
});

export type ThemeMode = Theme["palette"]["mode"];

const getMUITheme = (themeMode: ThemeMode) => {
  const themeConfig =
    themeMode === "light" ? lightThemeConfig : darkThemeConfig;

  return createTheme(themeConfig, {} as ThemeOptions);
};

export default getMUITheme;
