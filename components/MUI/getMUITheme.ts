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
    // TODO: We need to add colors from Figma
  },
  spacing,
});

const darkThemeConfig = createTheme({
  palette: {
    mode: "dark",
    // TODO: We need to add colors from Figma, and here as well
  },
  spacing,
});

const getMUITheme = (themeMode: ThemeMode) => {
  const themeConfig =
    themeMode === "light" ? lightThemeConfig : darkThemeConfig;

  return createTheme(themeConfig, {} as ThemeOptions);
};

export default getMUITheme;
