import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface ExtraPalette {}

  interface Palette extends ExtraPalette {}
  interface PaletteOptions extends ExtraPalette {}
}

export type ThemeMode = Theme["palette"]["mode"];

const spacing = 4;
// TODO: I'm not sure whether it should be 4 or 5

const primaryMainColor = {
  main: "#fe6c0a",
};

const secondaryMainColor = {
  main: "#3c93bf",
};

const lightThemeConfig = createTheme({
  palette: {
    mode: "light",
    primary: {
      ...primaryMainColor,
      light: "#f2f5f7",
      dark: "#3a3a3a",
    },
    secondary: {
      ...secondaryMainColor,
    },
    background: {
      paper: "#ffffff",
    },
  },
  spacing,
});

const darkThemeConfig = createTheme({
  palette: {
    mode: "dark",
    primary: {
      ...primaryMainColor,
      light: "#33393f",
      dark: "#000000",
    },
    secondary: {
      ...secondaryMainColor,
    },
    background: {
      paper: "#18191d",
    },
  },
  spacing,
});

const getMUITheme = (themeMode: ThemeMode) => {
  const themeConfig =
    themeMode === "light" ? lightThemeConfig : darkThemeConfig;

  return createTheme(themeConfig, {} as ThemeOptions);
};

export default getMUITheme;
