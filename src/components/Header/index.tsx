import { PostDocumentWithoutBody } from "interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/typesHooks";

import Logo from "./Logo";
import DesktopSearch from "./Search/DesktopSearch";
import MobileSearch from "./Search/MobileSearch";
import ThemeSwitcher from "./ThemeSwitcher";

export type Search = {
  value: string;
  showSearch: boolean;
  isLoaded: boolean;
  posts: PostDocumentWithoutBody[];
};

const toggleSearchVisibility = (show: boolean): void => {
  if (show) {
    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("position-fixed");
  } else {
    document.body.classList.remove("overflow-hidden");
    document.documentElement.classList.remove("position-fixed");
  }
};

const Header = () => {
  const [search, setSearch] = useState<Search>({
    value: "",
    showSearch: false,
    isLoaded: false,
    posts: [] as PostDocumentWithoutBody[],
  });

  const [showMenu, setShowMenu] = useState(false);

  const handleScreenChange = useCallback((): void => {
    toggleSearchVisibility(false);
    setShowMenu(false);
    setSearch({ ...search, showSearch: false });
  }, [search]);

  const { asPath } = useRouter();

  const config = useAppSelector((state) => state.tinaData.mainConfig);

  const filteredPosts = search.posts.filter((post) => {
    return post.title.toLowerCase().includes(search.value.toLowerCase());
  });

  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const windowMatchMedia = window.matchMedia("(orientation: portrait)");

    if (search.showSearch || showMenu) {
      toggleSearchVisibility(true);
    } else {
      toggleSearchVisibility(false);
    }

    windowMatchMedia.addEventListener("change", handleScreenChange);

    return () =>
      windowMatchMedia.removeEventListener("change", handleScreenChange);
  }, [search.showSearch, showMenu, handleScreenChange]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetch("/api/getAllPostsWithoutBody").then((data) =>
        data.json()
      );

      setSearch((search) => ({
        ...search,
        isLoaded: true,
        posts,
      }));
    };

    if (search.isLoaded === false) {
      // Prefetch on Desktop
      if (search.showSearch) {
        fetchData();
      }

      // Prefetch on Mobile
      if (showMenu && search.value.trim().length > 0) {
        fetchData();
      }
    }

    if (search.showSearch) {
      desktopInputRef.current?.focus();
    }

    if (showMenu) {
      mobileInputRef.current?.focus();
    }
  }, [
    search.showSearch,
    search.posts.length,
    search.value,
    showMenu,
    search.isLoaded,
  ]);

  const HeaderContentMobile = (
    <div className="header-content-mobile">
      <Logo />
      <div className="header-hamburger" onClick={() => setShowMenu(true)}>
        <img
          src="/images/hamburger.svg"
          alt="hamburger"
          width={34}
          height={22}
        />
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
      <MobileSearch
        search={search}
        setSearch={setSearch}
        mobileInputRef={mobileInputRef}
        filteredPosts={filteredPosts}
        setShowMenu={setShowMenu}
      />
      <div className="header-menu-outer">
        <ul className="header-menu">
          <li>
            <Link href="/" className={asPath === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/post/paid-services"
              className={asPath === "/post/paid-services" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              Paid Services
            </Link>
          </li>
        </ul>
        <div className="header-search-desktop">
          <img
            src="/images/search.svg"
            alt="search"
            onClick={() => {
              setSearch((search) => ({
                ...search,
                showSearch: true,
              }));
            }}
            width={19}
            height={19}
          />
        </div>
      </div>
      <ul className="header-socials">
        {config.socialLinks.map((link) => (
          <li key={link.link}>
            <a href={link.link} className={link.class ?? ""}>
              <img src={link.image} alt="image" width="24" height="24" />
            </a>
          </li>
        ))}
      </ul>
      <ThemeSwitcher />
    </div>
  );

  return (
    <header>
      <div className="container">
        {HeaderContentMobile}
        {HeaderContentDesktop}
      </div>

      {search.showSearch && (
        <DesktopSearch
          search={search}
          setSearch={setSearch}
          desktopInputRef={desktopInputRef}
          filteredPosts={filteredPosts}
        />
      )}
    </header>
  );
};

export default Header;
