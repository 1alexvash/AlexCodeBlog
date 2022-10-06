import React, { useEffect, useState } from "react";
import Link from "next/link";

const UndefinedPage = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    setTheme(localStorage.theme);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.querySelector("body")!;
      theme === "dark"
        ? body.classList.add("dark-theme")
        : body.classList.remove("dark-theme");
    }
  }, [theme]);

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
      <Link href="/" as={undefined}>
        <a href="" className="btn">
          Go home
        </a>
      </Link>
    </section>
  );
};

export default UndefinedPage;
