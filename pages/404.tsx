import Link from "next/link";
import React from "react";
import { useAppSelector } from "redux/typesHooks";

const NotFoundPage = () => {
  const theme = useAppSelector((state) => state.theme);

  return (
    <section className="content-404">
      <div className="image">
        {theme === "light" ? (
          <img
            className="light-404"
            width="683"
            height="346"
            src="/images/404_light.svg"
            alt="404_light"
          />
        ) : (
          <img
            className="dark-404"
            width="683"
            height="346"
            src="/images/404_dark.svg"
            alt="404_dark"
          />
        )}
      </div>
      <div className="title">This page could not be found.</div>
      <Link href="/" as={undefined} className="btn">
        Go home
      </Link>
    </section>
  );
};

export default NotFoundPage;
