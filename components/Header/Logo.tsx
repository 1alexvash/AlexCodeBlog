import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEditState } from "tinacms/dist/react";

const Logo = () => {
  const { edit } = useEditState();

  const logo = (
    <span className="main-logo">
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
    </span>
  );

  const router = useRouter();

  const onTheMainPage = router.pathname === "/";

  return onTheMainPage ? (
    logo
  ) : (
    <Link href={edit ? "/AdminPortal" : "/"}>{logo}</Link>
  );
};

export default Logo;
