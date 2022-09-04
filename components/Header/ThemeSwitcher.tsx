import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  type Theme = "light" | "dark";
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const body = document.querySelector("body")!;

    if (localStorage.theme === undefined) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
        body.classList.add("dark-theme");
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
    } else {
      if (theme === "light") {
        body.classList.remove("dark-theme");
        localStorage.theme = "light";
      } else {
        body.classList.add("dark-theme");
        localStorage.theme = "dark";
      }
    }
  }, [theme]);

  return (
    <ul className="theme-switcher">
      <li className="light" onClick={() => setTheme("light")}>
        <img src="/images/sun.svg" alt="" />
      </li>
      <li className="dark" onClick={() => setTheme("dark")}>
        <img src="/images/moon.svg" alt="" />
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
