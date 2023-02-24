import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { defaultTheme, setTheme } from "redux/slices/theme";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";
import { getTheme, ThemeMode } from "./theme";

const getStorageTheme = (): ThemeMode | undefined => {
  return localStorage.theme as ThemeMode | undefined;
};

const getBrowserTheme = (): ThemeMode => {
  return window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: dark)`).matches
    ? "dark"
    : "light";
};

const getInitialTheme = (): ThemeMode =>
  getStorageTheme() || getBrowserTheme() || defaultTheme;

interface DefaultThemeProps {
  children: JSX.Element[] | JSX.Element;
}

const MUIThemeProvider = ({ children }: DefaultThemeProps) => {
  const themeStore = useAppSelector((state) => state.theme) as ThemeMode;
  const [themeProvider, setThemeProvider] = useState<ThemeMode>(themeStore);

  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const theme = getInitialTheme();

    setThemeProvider(theme);

    dispatch(setTheme(theme));
  }, [dispatch, setThemeProvider]);

  useEffect(() => {
    setThemeProvider(themeStore);
  }, [themeStore]);

  const theme = getTheme(themeProvider);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
