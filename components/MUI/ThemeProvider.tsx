import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { defaultTheme, setTheme, Theme } from "redux/slices/theme";
import { useAppDispatch } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";
import MUITheme from "./theme";

interface Props {
  children: JSX.Element;
}

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

const ThemeProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const theme = getInitialTheme();

    dispatch(setTheme(theme));
  }, [dispatch]);

  return <MUIThemeProvider theme={MUITheme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
