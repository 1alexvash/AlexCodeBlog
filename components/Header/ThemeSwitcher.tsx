import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  type Theme = "light" | "dark";
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setTheme("dark");
      const body = document.querySelector("body")!;
      body.classList.add("dark-theme");
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body")!;

    if (theme === "light") {
      body.classList.remove("dark-theme");
      localStorage.theme = "light";
    } else {
      body.classList.add("dark-theme");
      localStorage.theme = "dark";
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
