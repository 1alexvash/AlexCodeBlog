import Link from "next/link";

import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => (
  <header>
    <div className="container">
      <div className="header-content-mobile">
        <a href="" className="main-logo">
          <img className="light" src="images/main-logo.svg" alt="" />
          <img className="dark" src="images/main-logo-dark.svg" alt="" />
        </a>
        <div className="header-buter">
          <img src="images/buter.svg" alt="" />
        </div>
      </div>
      <div className="header-content">
        <div className="tob-block">
          <Link href="/">
            <a className="main-logo">
              <img className="light" src="images/main-logo.svg" alt="" />
              <img className="dark" src="images/main-logo-dark.svg" alt="" />
            </a>
          </Link>
          <div className="header-close">
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
                <input type="text" placeholder="Site search" />
              </div>
            </form>
            {/* <div className="no-results">Not found.</div> */}
            <div className="mobile-search-results">
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
          <div className="mobile-search-overlay">
            <div className="close-search">
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
          <div className="header-search-desctop">
            <img src="images/search.svg" alt="" />
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
    {/* desctop-search */}
    <div className="desctop-search">
      <div className="container">
        <div className="desctop-search-content">
          <form
            action="#"
            method="post"
            className="desctop-search-form simple-form"
          >
            <div className="input-block">
              <input type="text" placeholder="Site search" />
            </div>
          </form>
          {/* <div className="no-results">Not found.</div> */}
          <div className="desctop-search-results">
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
    <div className="search-overlay">
      <div className="close-search">
        <img src="images/close-search.svg" alt="" />
      </div>
    </div>
  </header>
);

export default Header;
