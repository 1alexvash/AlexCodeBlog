import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  type Theme = "light" | "dark" | null;
  const [theme, setTheme] = useState<Theme>(null);

  const checkBrowserTheme = (theme: string) => {
    return (window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${theme})`).matches)
  }

  useEffect(() => {
    const body = document.querySelector("body")!;
    if (localStorage.theme === undefined) {
      if (checkBrowserTheme("dark")) {
        setTheme("dark");
        body.classList.add("dark-theme");
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
    } else {
      if (checkBrowserTheme("dark") && theme===null) {
            body.classList.add("dark-theme");
            localStorage.theme = "dark"; 
            setTheme("dark")
        } else if (checkBrowserTheme("light") && theme===null) {
            localStorage.theme = "light"; 
            setTheme("light")
        } else {
            if (theme === "light") {
                body.classList.remove("dark-theme");
                localStorage.theme = "light";
              } else {
                body.classList.add("dark-theme");
                localStorage.theme = "dark";
              }
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
