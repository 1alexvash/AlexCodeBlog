import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface ExtraPalette {}

  interface Palette extends ExtraPalette {}
  interface PaletteOptions extends ExtraPalette {}
}

export type ThemeMode = Theme["palette"]["mode"];

const primaryColors = {
  orange: "#fe6C0a",
  darkGrey: "#3a3a3a",
  lightGrey: "#f2f5f7",
  white: "#ffffff",
  darkBlack: "#18191d",
  lightBlack: "#33393f",
  blue: "#3c93bf",
  black: "#000000",
};

const lightThemeConfig = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryColors.orange,
      light: primaryColors.lightGrey,
      dark: primaryColors.darkGrey,
    },
    secondary: {
      main: primaryColors.blue,
    },
    background: {
      paper: primaryColors.white,
    },
  },
});

const darkThemeConfig = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primaryColors.orange,
      light: primaryColors.lightBlack,
      dark: primaryColors.black,
    },
    secondary: {
      main: primaryColors.blue,
    },
    background: {
      paper: primaryColors.darkBlack,
    },
  },
});

const getMUITheme = (themeMode: ThemeMode) => {
  const themeConfig =
    themeMode === "light" ? lightThemeConfig : darkThemeConfig;

  return createTheme(themeConfig, {} as ThemeOptions);
};

export default getMUITheme;
