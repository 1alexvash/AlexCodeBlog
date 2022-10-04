import config from "config";
import { PostDocumentWithoutContent } from "interfaces";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "./Logo";
import DesktopSearch from "./Search/DesktopSearch";
import MobileSearch from "./Search/MobileSearch";
import ThemeSwitcher from "./ThemeSwitcher";

export type Search = {
  value: string;
  showSearch: boolean;
  isLoaded: boolean;
  posts: PostDocumentWithoutContent[];
};

const Header = () => {
  const [search, setSearch] = useState<Search>({
    value: "",
    showSearch: false,
    isLoaded: false,
    posts: [] as PostDocumentWithoutContent[],
  });

  const [showMenu, setShowMenu] = useState(false);

  const filteredPosts = search.posts.filter((post) => {
    return post.title.toLowerCase().includes(search.value.toLowerCase());
  });

  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

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
  }, [search.showSearch, search.posts.length, search.value, showMenu]);

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
            width={19}
            height={19}

          />
        </div>
      </div>
      <ul className="header-socials">
        {config.social_links.map((link) => (
          <li key={link.link}>
            <a href={link.link}>
              <img
                src={link.image}
                alt="image"
                width={link.width}
                height={link.height}
              />
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
                ref={desktopInputRef}
              />
            </div>
          </form>

          {filteredPosts.length === 0 ? (
            <div className="no-results">Not found.</div>
          ) : (
            <div
              className="desktop-search-results"
              style={{
                display: showSearch ? "block" : "none",
              }}
            >
              {loading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonDesktop key={index} />
                ))}

              {filteredPosts.map((post, index) => (
                <div className="related-posts-block" key={index}>
                  <a href={`/post/${post.slug}`} className="image">
                    <img
                      src={post.featuredImage}
                      alt="blog post image"
                      width={102}
                      height={102}
                    />
                  </a>
                  <div className="inner">
                    <a href={`/post/${post.slug}`} className="name">
                      {post.title}
                    </a>
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <Link href="/" key={tag}>
                          <a
                            href=""
                            key={tag}
                            onClick={() => {
                              setShowSearch(false);
                              dispatch(setTags([tag]));
                            }}
                          >
                            #{tag}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
