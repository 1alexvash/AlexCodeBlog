import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Logo = () => {
  const logo = (
    <a className="main-logo">
      <img
        className="light"
        src="/images/main-logo.svg"
        alt="light-theme"
        width={180}
        height={60}
      />
      <img
        className="dark"
        src="/images/main-logo-dark.svg"
        alt="dark-theme"
        width={180}
        height={60}
      />
    </a>
  );

  const router = useRouter();

  const onTheMainPage = router.pathname === "/";

  return onTheMainPage ? logo : <Link href="/" legacyBehavior>{logo}</Link>;
};

export default Logo;
