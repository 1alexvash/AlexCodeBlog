import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface ExtraPalette {}

  interface Palette extends ExtraPalette {}
  interface PaletteOptions extends ExtraPalette {}
}

export type ThemeMode = Theme["palette"]["mode"];

const spacing = 4;
// TODO: I'm not sure whether it should be 4 or 5

const lightThemeConfig = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FE6C0A",
      light: "#F2F5F7",
      dark: "#3A3A3A",
    },
    background: {
      paper: "#fff",
    },
  },
  spacing,
});

const darkThemeConfig = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FE6C0A",
      light: "#33393F",
      dark: "#000000",
    },
    background: {
      paper: "#18191D",
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
