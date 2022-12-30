// Code duplicate to prevent the following error:
// https://github.com/vercel/next.js/discussions/12533

(() => {
  const defaultTheme = "light";

  const getStorageTheme = () => {
    return localStorage.getItem("theme");
  };

  const getBrowserTheme = () => {
    return window.matchMedia &&
      window.matchMedia(`(prefers-color-scheme: dark)`).matches
      ? "dark"
      : "light";
  };

  const getInitialTheme = () =>
    getStorageTheme() || getBrowserTheme() || defaultTheme;

  const theme = getInitialTheme();

  localStorage.setItem("theme", theme);

  const body = document.querySelector("body");

  if (theme === "dark") {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
})();
