import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Logo = () => {
  const logo = (
    <a className="main-logo">
      <img className="light" src="/images/main-logo.svg" alt="" />
      <img className="dark" src="/images/main-logo-dark.svg" alt="" />
    </a>
  );

  const router = useRouter();

  const onTheMainPage = router.pathname === "/";

  return onTheMainPage ? logo : <Link href="/">{logo}</Link>;
};

export default Logo;
