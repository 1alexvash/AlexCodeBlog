import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  type Theme = "light" | "dark";
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const body = document.querySelector("body")!;
    if (theme === "light") {
      body.classList.remove("dark-theme");
    } else {
      body.classList.add("dark-theme");
    }
  }, [theme]);

  return (
    <ul className="theme-switcher">
      <li className="light" onClick={() => setTheme("light")}>
        <img src="images/sun.svg" alt="" />
      </li>
      <li className="dark" onClick={() => setTheme("dark")}>
        <img src="images/moon.svg" alt="" />
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
