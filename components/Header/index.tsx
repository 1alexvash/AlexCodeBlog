import config from "config";
import Link from "next/link";
import { Post } from "pages";
import { useEffect, useState } from "react";
import { useAppDispatch } from "redux/typesHooks";

import { updateTags } from "../../redux/slices/selectedTags";
import Logo from "./Logo";
import SkeletonDesktop from "./SkeletonDesktop";
import SkeletonMobile from "./SkeletonMobile";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const dispatch = useAppDispatch();

  // const filteredPosts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(searchValue.toLowerCase())
  // );

  const HeaderContentMobile = (
    <div className="header-content-mobile">
      <Logo />
      <div className="header-hamburger" onClick={() => setShowMenu(true)}>
        <img src="/images/hamburger.svg" alt="hamburger" />
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const postsAPIResponse = await fetch("/api/getAllPosts").then((data) =>
        data.json()
      );
      console.log("postsAPIResponse:", postsAPIResponse);

      setLoading(false);
      // setPosts(postsAPIResponse);
    };

    if ((showSearch || showMenu) && posts.length === 0) {
      fetchData();
    }
  }, [showSearch, posts.length, showMenu]);

  const MobileSearch = (
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
      </div>
      <div
        className="mobile-search-overlay"
        style={{
          display: searchValue.trim().length > 0 ? "block" : "none",
        }}
      >
        <div className="close-search" onClick={() => setSearchValue("")}>
          <img src="/images/close-search.svg" alt="search" />
        </div>
      </div>
    </div>
  );

  const HeaderContentDesktop = (
    <div
      className="header-content"
      style={{
        display: showMenu ? "flex" : "none",
      }}
    >
      <div className="top-block">
        <Logo />

        <div className="header-close" onClick={() => setShowMenu(false)}>
          <img src="/images/close.svg" alt="close" />
        </div>
      </div>
      {/* mobile-search */}
      {MobileSearch}
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
            src="/images/search.svg"
            alt="search"
            onClick={() => setShowSearch(true)}
          />
        </div>
      </div>
      <ul className="header-socials">
        {config.social_links.map((link) => (
          <li key={link.link}>
            <a href={link.link}>
              <img src={link.image} alt="image" />
            </a>
          </li>
        ))}
      </ul>
      <ThemeSwitcher />
    </div>
  );

  const DesktopSearch = (
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
        </div>
      </div>
    </div>
  );

  const SearchOverlay = (
    <div
      className="search-overlay"
      style={{
        display: showSearch ? "block" : "none",
      }}
    >
      <div className="close-search" onClick={() => setShowSearch(false)}>
        <img src="/images/close-search.svg" alt="search" />
      </div>
    </div>
  );

  return (
    <header>
      <div className="container">
        {HeaderContentMobile}
        {HeaderContentDesktop}
      </div>
      {DesktopSearch}
      {SearchOverlay}
    </header>
  );
};

export default Header;
