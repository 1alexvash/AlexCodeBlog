import Link from "next/link";
import { useState } from "react";

import { postsJSON } from "../Posts";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="header-content-mobile">
          <Logo />
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
          <div className="top-block">
            <Link href="/">
              <Logo />
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
                {postsJSON.map((post, index) => (
                  <div className="mobile-posts-block" key={index}>
                    <div className="inner-flex">
                      <a href="" className="image">
                        <img src={post.image} alt="" />
                      </a>
                      <a href="" className="name">
                        {post.title}
                      </a>
                    </div>
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <a href="" key={tag}>
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mobile-search-overlay"
              style={{
                display: searchValue.trim().length > 0 ? "block" : "none",
              }}
            >
              <div className="close-search" onClick={() => setSearchValue("")}>
                <img src="images/close-search.svg" alt="" />
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
            <div className="header-search-desktop">
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
        className="desktop-search"
        style={{
          display: showSearch ? "block" : "none",
        }}
      >
        <div className="container">
          <div className="desktop-search-content">
            <form
              action="#"
              method="post"
              className="desktop-search-form simple-form"
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
              className="desktop-search-results"
              style={{
                display: showSearch ? "block" : "none",
              }}
            >
              {postsJSON.map((post, index) => (
                <div className="related-posts-block" key={index}>
                  <a href="" className="image">
                    <img src={post.image} alt="" />
                  </a>
                  <div className="inner">
                    <a href="" className="name">
                      {post.title}
                    </a>
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <a href="" key={tag}>
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
        <div className="close-search" onClick={() => setShowSearch(false)}>
          <img src="images/close-search.svg" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
