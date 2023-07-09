import { PaletteMode } from "@mui/material";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

import colors from "./colors";

export type ThemeMode = Theme["palette"]["mode"];

const getMUITheme = (mode: PaletteMode) => {
  const themeConfig = createTheme({
    palette: {
      mode,
      main: colors,
    },
  });

  return createTheme(themeConfig, {} as ThemeOptions);
};

export default getMUITheme;
