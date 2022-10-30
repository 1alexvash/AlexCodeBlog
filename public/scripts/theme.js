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

  const html = document.querySelector("html");

  if (theme === "dark") {
    html?.classList.add("dark-theme");
  } else {
    html?.classList.remove("dark-theme");
  }
})();
