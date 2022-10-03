import { useEffect, useState } from "react";
import { setThemeState } from "redux/slices/theme";
import { useAppDispatch } from "redux/typesHooks";

const ThemeSwitcher = () => {
  type Theme = "light" | "dark";
  const dispatch = useAppDispatch();
  const checkStorage = () => {
    if (typeof window !== "undefined") {
      return localStorage.theme;
    }
  };
  const [theme, setTheme] = useState<Theme>(checkStorage() || "light");

  const checkBrowserTheme = (theme: string) => {
    return (
      window.matchMedia &&
      window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
    );
  };

  useEffect(() => {
    const body = document.querySelector("body")!;
    if (localStorage.theme === undefined) {
      if (checkBrowserTheme("dark")) {
        setTheme("dark");
        body.classList.add("dark-theme");
        localStorage.theme = "dark";
        dispatch(setThemeState("dark"));
      } else {
        localStorage.theme = "light";
        dispatch(setThemeState("light"));
      }
    } else {
      if (theme === "light") {
        body.classList.remove("dark-theme");
        localStorage.theme = "light";
        dispatch(setThemeState("light"));
      } else {
        body.classList.add("dark-theme");
        localStorage.theme = "dark";
        dispatch(setThemeState("dark"));
      }
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
