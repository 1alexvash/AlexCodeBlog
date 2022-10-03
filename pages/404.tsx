import React from "react";
import Link from "next/link";
import { useAppSelector } from "redux/typesHooks";

const UndefinedPage = () => {
  const themeState = useAppSelector((state) => state.theme.themeState);
  if (typeof window !== "undefined") {
    const body = document.querySelector("body")!;
    console.log(themeState === "dark");
    themeState === "dark"
      ? body.classList.add("dark-theme")
      : body.classList.remove("dark-theme");
  }
  return (
    <>
      <section className="content-404">
        <div className="image">
          {themeState === "light" ? (
            <img
              className="light-404"
              width="683"
              height="346"
              src="/images/404_light.svg"
              alt=""
            />
          ) : (
            <img
              className="dark-404"
              width="683"
              height="346"
              src="/images/404_dark.svg"
              alt=""
            />
          )}
        </div>
        <div className="title">This page could not be found.</div>
        <Link href={"/"} as={undefined}>
          <a href="" className="btn">
            Go home
          </a>
        </Link>
      </section>
    </>
  );
};

export default UndefinedPage;
