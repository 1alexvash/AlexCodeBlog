import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  return (
    <ul className="theme-switcher">
      <li className="light" onClick={() => setTheme("light")}>
        <img src="/images/sun.svg" alt="sun" width={20} height={20} />
      </li>
      <li className="dark" onClick={() => setTheme("dark")}>
        <img src="/images/moon.svg" alt="moon" width={19} height={18} />
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
