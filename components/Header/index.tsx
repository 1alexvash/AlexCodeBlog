import Link from "next/link";
import { useState } from "react";

import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="header-content-mobile">
          <a href="" className="main-logo">
            <img className="light" src="images/main-logo.svg" alt="" />
            <img className="dark" src="images/main-logo-dark.svg" alt="" />
          </a>
          <div className="header-hamburger" onClick={() => setShowMenu(true)}>
            <img src="images/hamburger.svg" alt="" />
          </div>
        </div>
        <div
          className="header-content"
          style={{
            display: showMenu ? "flex" : "none",
          }}
        >
          <div className="tob-block">
            <Link href="/">
              <a className="main-logo">
                <img className="light" src="images/main-logo.svg" alt="" />
                <img className="dark" src="images/main-logo-dark.svg" alt="" />
              </a>
            </Link>
            <div className="header-close" onClick={() => setShowMenu(false)}>
              <img src="images/close.svg" alt="" />
            </div>
          </div>
          {/* mobile-search */}
          <div className="mobile-search">
            <div className="mobile-search-content">
              <form
                action="#"
                method="post"
                className="mobile-search-form simple-form"
              >
                <div className="input-block">
                  <input
                    type="text"
                    placeholder="Site search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                  />
                </div>
              </form>
              {/* <div className="no-results">Not found.</div> */}
              <div
                className="mobile-search-results"
                style={{
                  display: searchValue.trim().length > 0 ? "block" : "none",
                }}
              >
                <div className="mobile-posts-block">
                  <div className="inner-flex">
                    <a href="" className="image">
                      <img src="images/related-posts-1.jpg" alt="" />
                    </a>
                    <a href="" className="name">
                      Using SWR React Hooks With Next.js’ Incremental Static
                      Regeneration (ISR)
                    </a>
                  </div>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
                <div className="mobile-posts-block">
                  <div className="inner-flex">
                    <a href="" className="image">
                      <img src="images/related-posts-1.jpg" alt="" />
                    </a>
                    <a href="" className="name">
                      Using SWR React Hooks With Next.js’ Incremental Static
                      Regeneration (ISR)
                    </a>
                  </div>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
                <div className="mobile-posts-block">
                  <div className="inner-flex">
                    <a href="" className="image">
                      <img src="images/related-posts-1.jpg" alt="" />
                    </a>
                    <a href="" className="name">
                      Using SWR React Hooks With Next.js’ Incremental Static
                      Regeneration (ISR)
                    </a>
                  </div>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
                <div className="mobile-posts-block">
                  <div className="inner-flex">
                    <a href="" className="image">
                      <img src="images/related-posts-1.jpg" alt="" />
                    </a>
                    <a href="" className="name">
                      Using SWR React Hooks With Next.js’ Incremental Static
                      Regeneration (ISR)
                    </a>
                  </div>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
                <div className="mobile-posts-block">
                  <div className="inner-flex">
                    <a href="" className="image">
                      <img src="images/related-posts-1.jpg" alt="" />
                    </a>
                    <a href="" className="name">
                      Using SWR React Hooks With Next.js’ Incremental Static
                      Regeneration (ISR)
                    </a>
                  </div>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
                <div className="mobile-posts-block">
                  <div className="inner-flex">
                    <a href="" className="image">
                      <img src="images/related-posts-1.jpg" alt="" />
                    </a>
                    <a href="" className="name">
                      Using SWR React Hooks With Next.js’ Incremental Static
                      Regeneration (ISR)
                    </a>
                  </div>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mobile-search-overlay"
              style={{
                display: searchValue.trim().length > 0 ? "block" : "none",
              }}
            >
              <div className="close-search">
                <img
                  src="images/close-search.svg"
                  alt=""
                  onClick={() => setSearchValue("")}
                />
              </div>
            </div>
          </div>
          <div className="header-menu-outer">
            <ul className="header-menu">
              <li>
                <Link href="/">
                  <a className="active">Home</a>
                </Link>
              </li>
            </ul>
            <div className="header-search-desctop">
              <img
                src="images/search.svg"
                alt=""
                onClick={() => setShowSearch(true)}
              />
            </div>
          </div>
          <ul className="header-socials">
            <li>
              <a href="https://t.me/HeWorksSoHard">
                <img src="images/telegram.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="https://github.com/1alexvash" className="git">
                <img src="images/github.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="mailto:1alexvash@gmail.com">
                <img src="images/mail.svg" alt="" />
              </a>
            </li>
          </ul>
          <ThemeSwitcher />
        </div>
      </div>
      <div
        className="desctop-search"
        style={{
          display: showSearch ? "block" : "none",
        }}
      >
        <div className="container">
          <div className="desctop-search-content">
            <form
              action="#"
              method="post"
              className="desctop-search-form simple-form"
            >
              <div className="input-block">
                <input
                  type="text"
                  placeholder="Site search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>
            </form>
            {/* <div className="no-results">Not found.</div> */}
            <div
              className="desctop-search-results"
              style={{
                display: showSearch ? "block" : "none",
              }}
            >
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-1.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental Static
                    Regeneration (ISR)
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-2.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Client-Side Routing In Next.js
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-3.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-1.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental Static
                    Regeneration (ISR)
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-2.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Client-Side Routing In Next.js
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-3.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-1.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental Static
                    Regeneration (ISR)
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-2.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Client-Side Routing In Next.js
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-3.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                  </div>
                </div>
              </div>
              <div className="related-posts-block">
                <a href="" className="image">
                  <img src="images/related-posts-1.jpg" alt="" />
                </a>
                <div className="inner">
                  <a href="" className="name">
                    Using SWR React Hooks With Next.js’ Incremental Static
                    Regeneration (ISR)
                  </a>
                  <div className="tags">
                    <a href="">#Firebase</a>
                    <a href="">#React</a>
                    <a href="">#Typescript</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="search-overlay"
        style={{
          display: showSearch ? "block" : "none",
        }}
      >
        <div className="close-search">
          <img
            src="images/close-search.svg"
            alt=""
            onClick={() => setShowSearch(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
