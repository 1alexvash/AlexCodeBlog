import { useTheme } from "next-themes";
import { setTheme } from "redux/slices/theme";
import { useAppDispatch } from "redux/typesHooks";

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { setTheme: setNextTheme } = useTheme();
  return (
    <ul className="theme-switcher">
      <li
        className="light"
        onClick={() => {
          dispatch(setTheme("light"));
          setNextTheme("light");
        }}
      >
        <img src="/images/sun.svg" alt="sun" width={20} height={20} />
      </li>
      <li
        className="dark"
        onClick={() => {
          dispatch(setTheme("dark"));
          setNextTheme("dark");
        }}
      >
        <img src="/images/moon.svg" alt="moon" width={19} height={18} />
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
