// Code duplicate to prevent the following error:
// https://github.com/vercel/next.js/discussions/12533

document.addEventListener("DOMContentLoaded", () => {
  const defaultTheme = "dark";

  const getStorageTheme = () => {
    return localStorage.theme;
  };

  const getBrowserTheme = () => {
    if (window.matchMedia === undefined) {
      return undefined;
    }

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    } else {
      return "dark";
    }
  };

  const getInitialTheme = () =>
    getStorageTheme() || getBrowserTheme() || defaultTheme;

  const theme = getInitialTheme();

  localStorage.setItem("theme", theme);

  const body = document.querySelector("body");

  if (theme === "dark") {
    body?.classList.add("dark-theme");
  } else {
    body?.classList.remove("dark-theme");
  }
});
