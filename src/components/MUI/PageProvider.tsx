import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useState } from "react";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";
import getMUITheme from "./getMUITheme";

interface Props {
  children: JSX.Element;
}
type Theme = "light" | "dark";

const defaultTheme = "dark";

const getStorageTheme = (): Theme | undefined => {
  return localStorage.theme;
};

const getBrowserTheme = (): Theme | undefined => {
  if (window.matchMedia === undefined) {
    return undefined;
  }

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  } else {
    return "dark";
  }
};

const getInitialTheme = (): Theme =>
  getStorageTheme() || getBrowserTheme() || defaultTheme;

const PageProvider = ({ children }: Props) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    const initialTheme = getInitialTheme();

    setTheme(initialTheme);
  }, []);

  if (!mounted) {
    return null;
  }

  if (theme !== "dark" && theme !== "light") {
    return null;
  }

  const MUITheme = getMUITheme(theme);

  return <MUIThemeProvider theme={MUITheme}>{children}</MUIThemeProvider>;
};

export default PageProvider;
