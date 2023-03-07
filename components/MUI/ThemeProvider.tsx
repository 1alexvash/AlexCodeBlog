import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { defaultTheme, setTheme, Theme } from "redux/slices/theme";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";
import getMUITheme, { ThemeMode } from "./getMUITheme";

interface Props {
  children: JSX.Element;
}

const getStorageTheme = (): Theme | undefined => {
  return localStorage.theme;
};

const getBrowserTheme = () => {
  return window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: dark)`).matches
    ? "dark"
    : "light";
};

const getInitialTheme = (): Theme =>
  getStorageTheme() || getBrowserTheme() || defaultTheme;

const ThemeProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const MUITheme = getMUITheme(theme as ThemeMode);

  useIsomorphicLayoutEffect(() => {
    const initialTheme = getInitialTheme();

    dispatch(setTheme(initialTheme));
  }, [dispatch]);

  return <MUIThemeProvider theme={MUITheme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;