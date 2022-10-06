import { useEffect, useState } from "react";
import { setThemeState } from "redux/slices/theme";
import { useAppDispatch } from "redux/typesHooks";

type Theme = "light" | "dark";

const tryGetStorageTheme = (): Theme | undefined => {
  if (typeof window !== "undefined") {
    return localStorage.theme;
  }
};

const getBrowserTheme = (): Theme | undefined => {
  if (typeof window !== "undefined") {
    return window.matchMedia &&
      window.matchMedia(`(prefers-color-scheme: dark)`).matches
      ? "dark"
      : "light";
  }
};

const getInitialTheme = (): Theme =>
  tryGetStorageTheme() || getBrowserTheme() || "light";

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.theme = theme;
  }, [theme]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (body === null) {
      console.error("Can't find element body");
      return;
    }

    if (theme === "light") {
      dispatch(setThemeState("light"));
      body.classList.remove("dark-theme");
    } else {
      dispatch(setThemeState("dark"));
      body.classList.add("dark-theme");
    }
  }, [theme]);

  return (
    <ul className="theme-switcher">
      <li className="light" onClick={() => setTheme("light")}>
        <img src="/images/sun.svg" alt="sun" />
      </li>
      <li className="dark" onClick={() => setTheme("dark")}>
        <img src="/images/moon.svg" alt="moon" />
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
