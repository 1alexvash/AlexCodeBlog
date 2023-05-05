import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Logo = () => {
  const logo = (
    <span className="main-logo">
      <Image
        className="light"
        src="/images/main-logo.svg"
        alt="light-theme"
        width={180}
        height={60}
        priority
      />
      <Image
        className="dark"
        src="/images/main-logo-dark.svg"
        alt="dark-theme"
        width={180}
        height={60}
        priority
      />
    </span>
  );

  const router = useRouter();

  const onTheMainPage = router.pathname === "/";

  return onTheMainPage ? logo : <Link href="/">{logo}</Link>;
};

export default Logo;
