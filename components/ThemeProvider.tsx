import { defaultTheme, setTheme, Theme } from "redux/slices/theme";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

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

export const getInitialTheme = (): Theme =>
  getStorageTheme() || getBrowserTheme() || defaultTheme;

const ThemeProvider = ({ children }: Props) => {
  const theme = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const defaultTheme = getInitialTheme();

    dispatch(setTheme(defaultTheme));
  }, [dispatch]);

  if (theme === null) {
    return <>Loading spinner</>;
  }

  return children;
};

export default ThemeProvider;
