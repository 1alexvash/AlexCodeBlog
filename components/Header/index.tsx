import { PostDocumentWithoutBody } from "interfaces";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const Header = () => {
  const [search, setSearch] = useState<Search>({
    value: "",
    showSearch: false,
    isLoaded: false,
    posts: [] as PostDocumentWithoutBody[],
  });

  const config = useAppSelector((state) => state.tinaData.main_config);

  const [showMenu, setShowMenu] = useState(false);

  const filteredPosts = search.posts.filter((post) => {
    return post.title.toLowerCase().includes(search.value.toLowerCase());
  });

  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.showSearch) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [search.showSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetch("/api/getAllPosts").then((data) => data.json());

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
            <Link href="/" className="active">
              Home
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
        {config.social_links.map((link) => (
          <li key={link.link}>
            <a href={link.link} className={link.class ?? ""}>
              <img
                src={link.image}
                alt="image"
                // width={link.width}
                // height={link.height}
              />
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
