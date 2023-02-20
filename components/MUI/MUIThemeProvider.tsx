import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { defaultTheme, setTheme, Theme } from "redux/slices/theme";
import { useAppDispatch } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";
import { getTheme, ThemeMode } from "./theme";

const getStorageTheme = (): Theme | undefined => {
  return localStorage.theme;
};

const getBrowserTheme = (): Theme | undefined => {
  return window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: dark)`).matches
    ? "dark"
    : "light";
};

const getInitialTheme = (): Theme =>
  getStorageTheme() || getBrowserTheme() || defaultTheme;

interface DefaultThemeProps {
  children: JSX.Element[] | JSX.Element;
}

const MUIThemeProvider = ({ children }: DefaultThemeProps) => {
  const [themeProv, setThemeProv] = useState({});
  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const theme = getInitialTheme();

    setThemeProv({ theme });

    dispatch(setTheme(theme));
  }, [dispatch, setThemeProv]);

  return <ThemeProvider theme={themeProv}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
