import Image from "next/image";
import { setTheme } from "redux/slices/theme";
import { useAppDispatch } from "redux/typesHooks";

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();

  return (
    <ul className="theme-switcher">
      <li className="light" onClick={() => dispatch(setTheme("light"))}>
        <Image
          src="/images/sun.svg"
          alt="sun"
          width={20}
          height={20}
          priority
        />
      </li>
      <li className="dark" onClick={() => dispatch(setTheme("dark"))}>
        <Image
          src="/images/moon.svg"
          alt="moon"
          width={19}
          height={18}
          priority
        />
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
